import { useEffect, useState } from "react";

import { useTimer } from "react-timer-hook";

import useWorkoutDetailsStore from "stores/useWorkoutDetailsStore";
import useWorkoutSession from "stores/useWorkoutSession";

import styles from "./styles/WorkoutInProgress.module.scss";

import NextExercise from "./components/NextExercise";
import ControlTime from "./components/ControlTime";
import Rest from "./components/Rest";

import { useApiRequest } from "hooks";

export default function WorkoutInProgress() {
  const [exercise, setExercise] = useState({
    name: "",
    reps: null,
    id: null,
    rest: null,
  });
  const [restTime, setRestTime] = useState(5);
  const { workoutDetails } = useWorkoutDetailsStore();
  const {
    workoutSession,
    addExerciseToRound,
    startWorkout,
    updateWorkoutSession,
  } = useWorkoutSession();
  const { data, error, isLoading, request } = useApiRequest();
  //const workoutStarted = workoutSession.start && workoutSession.rounds.length;
  const time = new Date();
  time.setSeconds(time.getSeconds() + restTime);

  const { seconds, isRunning, start, pause, resume } = useTimer({
    expiryTimestamp: time,
    onExpire: timerExpired,
  });

  useEffect(() => {
    if (data) {
      if (!workoutSession.start) {
        startWorkout();
      }
      addExerciseInRound(data);
    }
  }, [data]);

  useEffect(() => {
    findExercise();
    findTimeRest();
  }, [workoutSession.rounds]);

  async function timerExpired() {
    const roundNumber = workoutSession.rounds.length || 1;
    console.log(exercise);
    request("/api/wod/progress", "POST", {
      userWorkoutSessionId: workoutSession.userSessionWorkoutId,
      exerciseId: exercise.id,
      roundNumber,
      roundId: workoutDetails.WorkoutRounds[0].roundId,
      rest: exercise.rest,
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
    const indexRounds = workoutSession.rounds.length;
    addExerciseToRound(indexRounds, exerciseUpdated);
  }

  function findTimeRest() {
    if (workoutSession.start) {
      const currentRound =
        workoutSession.rounds[workoutSession.rounds.length - 1];
      const exerciseFinished = currentRound[currentRound.length - 1];
      const rest = exerciseFinished.rest;
      setRestTime(rest);
    }
  }

  function findExercise() {
    let exercise = workoutDetails.WorkoutRounds[0].Rounds.RoundExercises[0];
    if (workoutSession.start) {
    }

    setExercise({
      name: exercise.Exercises.name,
      reps: exercise.reps,
      id: exercise.exerciseId,
      rest: exercise.rest,
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
  return (
    <div className={styles.containerWorkoutInProgress}>
      {!workoutSession.start ? (
        <>
          <Rest rest={seconds} />
          <div>
            <NextExercise reps={exercise.reps} name={exercise.name} />
            <ControlTime
              returnPrevious={returnPrevious}
              isRunning={isRunning}
              start={start}
              pause={pause}
              resume={resume}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
