import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { useTimer, useStopwatch } from "react-timer-hook";

import useWorkoutDetailsStore from "stores/useWorkoutDetailsStore";
import useWorkoutSession from "stores/useWorkoutSession";

import styles from "./styles/WorkoutInProgress.module.scss";

import ElapsedTimeWorkout from "./components/ElapsedTimeWorkout";
import ExerciseInProgress from "./components/ExerciseInProgress";
import WorkoutCompleted from "./components/WorkoutCompleted";
import NextExercise from "./components/NextExercise";
import ControlTime from "./components/ControlTime";
import RoundFinish from "./components/RoundFinish";
import TotalTime from "./components/TotalTime";
import TotalReps from "./components/TotalReps";
import Loader from "./components/Loader";
import Rest from "./components/Rest";
import BackHome from "../BackHome";

import { useApiRequest } from "hooks";

export default function WorkoutInProgress() {
  const [userSkippedTimerRest, setUserSkippedTimerRest] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [numberRoundsToDo, setNumberRoundsToDo] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [restBetweenRound, setRestBetweenRound] = useState(60);
  const [roundFinished, setRoundFinished] = useState(false);

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
  const { data: session } = useSession();
  const { workoutDetails } = useWorkoutDetailsStore();
  const {
    workoutSession,
    addExerciseToRound,
    startWorkout,
    updateWorkoutSession,
    updateExerciseInRound,
    endWorkout,
  } = useWorkoutSession();

  const { data, error, isLoading, request } = useApiRequest();
  const {
    data: dataWorkoutProgress,
    error: errorWorkoutProgress,
    isLoading: isLoadingWorkoutProgress,
    request: requestWorkoutProgress,
  } = useApiRequest();

  const {
    data: dataWorkoutCompleted,
    error: errorWorkoutCompleted,
    isLoading: isLoadingWorkoutCompleted,
    request: requestWorkoutCompleted,
  } = useApiRequest();

  const time = new Date();
  time.setSeconds(time.getSeconds() + restTime);

  const { totalSeconds, isRunning, start, pause, resume, restart } = useTimer({
    expiryTimestamp: time,
    onExpire: nextExercise,
  });
  const stopwatchOffset = new Date();
  stopwatchOffset.setSeconds(
    stopwatchOffset.getSeconds() + workoutSession.totalSecondsSpent
  );
  const {
    totalSeconds: watchTotalSeconds,
    seconds: watchSeconds,
    minutes: watchMinutes,
    hours: watchHours,
    isRunning: watchIsRunning,
    start: watchStart,
    pause: watchPause,
  } = useStopwatch({
    autoStart: false,
    offsetTimestamp: stopwatchOffset,
  });

  useEffect(() => {
    if (data) {
      if (!workoutSession.start) {
        startWorkout();
      }
      if (data.message !== "progress-exist") addExerciseInRound(data);
      pause();
      setRoundFinished(false);
      const updateSession = { rest: false };
      updateWorkoutSession(updateSession);
      setDisplayComponents(true);
    }
  }, [data]);

  useEffect(() => {
    if (dataWorkoutProgress) {
      const { roundNumber, exerciseId } = dataWorkoutProgress;
      updateExerciseInRound(roundNumber - 1, exerciseId, { completed: true });
      findNextExercise();
      setUserSkippedTimerRest(false);
    }
  }, [dataWorkoutProgress]);

  useEffect(() => {
    if (exercise.name) {
      findTimeRest();
      setDisplayComponents(true);
    }
  }, [exercise.name]);

  useEffect(() => {
    findNextExercise();

    const { rest, number } = workoutDetails.WorkoutRounds[0].Rounds;
    setRestBetweenRound(rest);
    setNumberRoundsToDo(number);
  }, []);

  useEffect(() => {
    if (roundFinished && currentRound === numberRoundsToDo) {
      setWorkoutCompleted(true);
      updateWorkoutToCompleted();
      pause();
      watchPause();
      endWorkout();
    }
  }, [roundFinished]);

  async function nextExercise(callByUser = false) {
    if (userSkippedTimerRest) return;
    const roundNumber = workoutSession.returnNContinue
      ? getNextRoundForContinuation(workoutSession, roundFinished)
      : getNextRoundNormally(roundFinished, currentRound);
    setDisplayComponents(false);
    setCurrentRound(roundNumber);

    request("/api/wod/progress", "POST", {
      userWorkoutSessionId: workoutSession.userSessionWorkoutId,
      exerciseId: exercise.id,
      roundNumber,
      roundId: workoutDetails.WorkoutRounds[0].roundId,
      rest: exercise.rest,
      totalSecondsSpent: watchTotalSeconds,
    });
    if (callByUser) setUserSkippedTimerRest(true);
  }

  function getNextRoundForContinuation(session, isRoundFinished) {
    return isRoundFinished ? session.rounds.length + 1 : session.rounds.length;
  }

  function getNextRoundNormally(isRoundFinished, currentRound) {
    return isRoundFinished ? currentRound + 1 : currentRound;
  }

  function nextRest() {
    setDisplayComponents(false);
    const returnNContinue = !!workoutSession.returnNContinue;
    const updateSession = { rest: true, returnNContinue: false };
    updateWorkoutSession(updateSession);

    const roundNumber = returnNContinue
      ? workoutSession.rounds.length
      : currentRound;
    const exercises = workoutSession.rounds[roundNumber - 1];
    const exerciseFinished = exercises[exercises.length - 1];
    const { exerciseId, roundId, rest, idUserWorkoutProgress } =
      exerciseFinished;

    requestWorkoutProgress("/api/wod/progress-update", "PUT", {
      userWorkoutSessionId: workoutSession.userSessionWorkoutId,
      idUserWorkoutProgress,
      exerciseId,
      roundNumber,
      roundId,
      rest,
      totalSecondsSpent: watchTotalSeconds,
    });
  }

  function addExerciseInRound(userWorkoutProgress) {
    const exerciseUpdated = {
      idUserWorkoutProgress: userWorkoutProgress.idUserWorkoutProgress,
      roundId: userWorkoutProgress.roundId,
      exerciseId: userWorkoutProgress.exerciseId,
      roundNumber: userWorkoutProgress.roundNumber,
      rest: exercise.rest,
      completed: false,
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

  function nextExoInCurrentRound() {
    let exo = undefined;
    if (workoutSession.returnNContinue) {
      const lastRoundExercises = workoutSession.rounds[
        workoutSession.rounds.length - 1
      ].reduce((acc, curr) => {
        acc[curr.exerciseId] = curr.completed;
        return acc;
      }, {});

      exo = workoutDetails.WorkoutRounds[0].Rounds.RoundExercises.find(
        (exercise) => {
          return (
            lastRoundExercises[exercise.exerciseId] === undefined ||
            !lastRoundExercises[exercise.exerciseId]
          );
        }
      );
    } else {
      exo = workoutDetails.WorkoutRounds[0].Rounds.RoundExercises.find(
        (exercise) =>
          !workoutSession.rounds[currentRound - 1].some(
            (finishedExercise) =>
              finishedExercise.exerciseId === exercise.exerciseId
          )
      );
    }

    return exo;
  }

  function findNextExercise() {
    let exercise = workoutDetails.WorkoutRounds[0].Rounds.RoundExercises[0];
    if (workoutSession.start) {
      const nextExerciseCurrentRound = nextExoInCurrentRound();
      if (nextExerciseCurrentRound) {
        const { name, stickerVideo, urlVideo } =
          nextExerciseCurrentRound.Exercises;
        setExercise({
          name,
          reps: nextExerciseCurrentRound.reps,
          id: nextExerciseCurrentRound.exerciseId,
          rest: nextExerciseCurrentRound.rest,
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

  function updateWorkoutToCompleted() {
    requestWorkoutCompleted("/api/wod/session-update", "PUT", {
      email: session.user.email,
      workoutId: workoutDetails.id,
      idUserWorkoutSession: workoutSession.userSessionWorkoutId,
    });
  }
  const shouldNotDisplayContent =
    isLoading || isLoadingWorkoutProgress || !displayComponents;
  return (
    <div
      className={
        shouldNotDisplayContent
          ? `${styles.containerWorkoutInProgress} ${styles.containerLoader}`
          : styles.containerWorkoutInProgress
      }
    >
      {shouldNotDisplayContent ? (
        <Loader />
      ) : !workoutSession.start ? (
        <>
          <Rest rest={totalSeconds} sessionStart={false} />
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
          <BackHome />
        </>
      ) : (
        <>
          <ElapsedTimeWorkout
            hours={watchHours}
            minutes={watchMinutes}
            seconds={watchSeconds}
          />
          <Rest rest={totalSeconds} roundFinished={roundFinished} />
          {roundFinished ? <RoundFinish round={currentRound} /> : ""}
          <NextExercise reps={exercise.reps} name={exercise.name} />
          <ControlTime
            workoutStart={true}
            isRunning={watchIsRunning}
            start={start}
            pause={handlePause}
            resume={handleResume}
            nextExercise={nextExercise}
            elapsedTimeWorkout={true}
          />
        </>
      )}
    </div>
  );
}
