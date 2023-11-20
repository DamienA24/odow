import { useEffect, useState } from "react";

import { useTimer, useStopwatch } from "react-timer-hook";

import useWorkoutDetailsStore from "stores/useWorkoutDetailsStore";
import useWorkoutSession from "stores/useWorkoutSession";

import styles from "./styles/WorkoutInProgress.module.scss";

import ElapsedTimeWorkout from "./components/ElapsedTimeWorkout";
import ExerciseInProgress from "./components/ExerciseInProgress";
import WorkoutCompleted from "./components/WorkoutCompleted";
import NextExercise from "./components/NextExercise";
import ControlTime from "./components/ControlTime";
import Rest from "./components/Rest";

import { useApiRequest } from "hooks";
import TotalTime from "./components/TotalTime";
import TotalReps from "./components/TotalReps";

export default function WorkoutInProgress() {
  const [userSkippedTimerRest, setUserSkippedTimerRest] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [numberRoundsToDo, setNumberRoundsToDo] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [restBetweenRound, setRestBetweenRound] = useState(60);
  const [roundFinished, setRoundFinished] = useState(false);
  const [offsetWatch, setOffsetWatch] = useState(new Date(0));
  const [displayComponents, setDisplayComponents] = useState(false);
  const [exercise, setExercise] = useState({
    name: "",
    reps: null,
    id: null,
    rest: null,
    urlVideo: "",
    stickerVideo: "",
  });
  const [restTime, setRestTime] = useState(10);
  const { workoutDetails } = useWorkoutDetailsStore();
  const {
    workoutSession,
    addExerciseToRound,
    startWorkout,
    updateWorkoutSession,
    endWorkout,
  } = useWorkoutSession();

  const { data, error, isLoading, request } = useApiRequest();
  const {
    data: dataWorkoutProgress,
    error: errorWorkoutProgress,
    isLoading: isLoadingWorkoutProgress,
    request: requestWorkoutProgress,
  } = useApiRequest();

  const time = new Date();
  time.setSeconds(time.getSeconds() + restTime);

  const { totalSeconds, isRunning, start, pause, resume, restart } = useTimer({
    expiryTimestamp: time,
    onExpire: nextExercise,
  });

  const {
    seconds: watchSeconds,
    minutes: watchMinutes,
    hours: watchHours,
    isRunning: watchIsRunning,
    start: watchStart,
    pause: watchPause,
  } = useStopwatch({ autoStart: false, offsetTimestamp: offsetWatch });

  useEffect(() => {
    if (data) {
      if (!workoutSession.start) {
        startWorkout();
      }
      addExerciseInRound(data);
      pause();
      setRoundFinished(false);
      const updateSession = { rest: false };
      updateWorkoutSession(updateSession);
      setDisplayComponents(true);
    }
  }, [data]);

  useEffect(() => {
    if (dataWorkoutProgress) {
      findExercise();
      setUserSkippedTimerRest(false);
    }
  }, [dataWorkoutProgress]);

  useEffect(() => {
    if (exercise) {
      findTimeRest();
      setDisplayComponents(true);
    }
  }, [exercise]);

  useEffect(() => {
    findExercise();
    const now = new Date();
    setOffsetWatch(now);

    const { rest, number } = workoutDetails.WorkoutRounds[0].Rounds;
    setRestBetweenRound(rest);
    setNumberRoundsToDo(number);
  }, []);

  useEffect(() => {
    if (roundFinished && currentRound === numberRoundsToDo) {
      setWorkoutCompleted(true);
      pause();
      watchPause();
      endWorkout();
    }
  }, [roundFinished]);

  async function nextExercise(callByUser = false) {
    if (userSkippedTimerRest) return;
    const roundNumber = roundFinished ? currentRound + 1 : currentRound;
    setDisplayComponents(false);
    setCurrentRound(roundNumber);
    request("/api/wod/progress", "POST", {
      userWorkoutSessionId: workoutSession.userSessionWorkoutId,
      exerciseId: exercise.id,
      roundNumber,
      roundId: workoutDetails.WorkoutRounds[0].roundId,
      rest: exercise.rest,
    });
    if (callByUser) setUserSkippedTimerRest(true);
  }

  function nextRest() {
    setDisplayComponents(false);
    const updateSession = { rest: true };
    updateWorkoutSession(updateSession);

    const roundNumber = currentRound;
    const exercises = workoutSession.rounds[roundNumber - 1];
    const exerciseFinished = exercises[exercises.length - 1];
    const { exerciseId, roundId, rest, idUserWorkoutProgress } =
      exerciseFinished;
    requestWorkoutProgress("/api/wod/progress-update", "PUT", {
      idUserWorkoutProgress,
      exerciseId,
      roundNumber,
      roundId,
      rest,
    });
  }

  function addExerciseInRound(userWorkoutProgress) {
    const exerciseUpdated = {
      idUserWorkoutProgress: userWorkoutProgress.idUserWorkoutProgress,
      roundId: userWorkoutProgress.roundId,
      exerciseId: userWorkoutProgress.exerciseId,
      roundNumber: userWorkoutProgress.roundNumber,
      rest: exercise.rest,
    };
    const indexRounds = currentRound - 1;
    addExerciseToRound(indexRounds, exerciseUpdated);
  }

  function findTimeRest() {
    let rest = restBetweenRound;
    if (workoutSession.start) {
      if (!roundFinished) {
        const currentRound =
          workoutSession.rounds[workoutSession.rounds.length - 1];
        const exerciseFinished = currentRound[currentRound.length - 1];
        rest = exerciseFinished.rest;
        setRestTime(rest);
      }

      if (workoutSession.rest) {
        const time = new Date();
        time.setSeconds(time.getSeconds() + rest);
        restart(time);
      }
    }
  }

  function exoInCurrentRound() {
    const exo = workoutDetails.WorkoutRounds[0].Rounds.RoundExercises.find(
      (exercise) =>
        !workoutSession.rounds[currentRound - 1].some(
          (finishedExercise) =>
            finishedExercise.exerciseId === exercise.exerciseId
        )
    );

    return exo;
  }

  function findExercise() {
    let exercise = workoutDetails.WorkoutRounds[0].Rounds.RoundExercises[0];
    if (workoutSession.start) {
      const exoCurrentRound = exoInCurrentRound();
      if (exoCurrentRound) {
        const { name, stickerVideo, urlVideo } = exoCurrentRound.Exercises;
        setExercise({
          name,
          reps: exoCurrentRound.reps,
          id: exoCurrentRound.exerciseId,
          rest: exoCurrentRound.rest,
          urlVideo,
          stickerVideo,
        });
        return;
      }
      setRoundFinished(true);
    }

    const { name, stickerVideo, urlVideo } = exercise.Exercises;
    setExercise({
      name,
      reps: exercise.reps,
      id: exercise.exerciseId,
      rest: exercise.rest,
      urlVideo,
      stickerVideo,
    });
  }

  function returnPrevious() {
    let updateSession = {};
    if (workoutSession.start) {
    } else {
      updateSession.returnStart = true;
      updateSession.preStart = false;
    }

    updateWorkoutSession(updateSession);
  }

  function handlePause() {
    if (workoutSession.rest) {
      pause();
      watchPause();
    } else {
      watchPause();
    }
  }

  function handleResume() {
    if (workoutSession.rest) {
      resume();
      watchStart();
    } else {
      watchStart();
    }
  }

  return (
    <div className={styles.containerWorkoutInProgress}>
      {isLoading || isLoadingWorkoutProgress || !displayComponents ? (
        ""
      ) : !workoutSession.start ? (
        <>
          <Rest rest={totalSeconds} />
          <div>
            <NextExercise reps={exercise.reps} name={exercise.name} />
            <ControlTime
              returnPrevious={returnPrevious}
              isRunning={isRunning}
              start={start}
              pause={pause}
              resume={resume}
              nextExercise={nextExercise}
            />
          </div>
        </>
      ) : !workoutSession.rest ? (
        <>
          <ElapsedTimeWorkout
            hours={watchHours}
            minutes={watchMinutes}
            seconds={watchSeconds}
          />
          <ExerciseInProgress
            reps={exercise.reps}
            name={exercise.name}
            urlVideo={exercise.urlVideo}
          />
          <ControlTime
            workoutStart={true}
            isRunning={watchIsRunning}
            resume={watchStart}
            pause={watchPause}
            nextExercise={nextRest}
            elapsedTimeWorkout={true}
          />
        </>
      ) : workoutCompleted ? (
        <>
          <TotalTime
            hours={watchHours}
            minutes={watchMinutes}
            seconds={watchSeconds}
          />
          <TotalReps />
          <WorkoutCompleted />
        </>
      ) : (
        <>
          <ElapsedTimeWorkout
            hours={watchHours}
            minutes={watchMinutes}
            seconds={watchSeconds}
          />
          <Rest rest={totalSeconds} />
          {roundFinished ? (
            <p style={{ color: "red" }}>Round {currentRound} finished</p>
          ) : (
            ""
          )}
          <NextExercise reps={exercise.reps} name={exercise.name} />
          <ControlTime
            workoutStart={true}
            isRunning={isRunning}
            start={start}
            pause={handlePause}
            resume={handleResume}
            nextExercise={nextExercise}
            elapsedTimeWorkout={false}
          />
        </>
      )}
    </div>
  );
}
