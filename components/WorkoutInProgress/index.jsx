import { useEffect } from "react";

import { useTimer } from "react-timer-hook";

import useWorkoutDetailsStore from "stores/useWorkoutDetailsStore";
import useWorkoutSession from "stores/useWorkoutSession";

import styles from "./styles/WorkoutInProgress.module.scss";

import NextExercise from "./components/NextExercise";
import ControlTime from "./components/ControlTime";
import Rest from "./components/Rest";

import { useApiRequest } from "hooks";

export default function WorkoutInProgress() {
  const { workoutDetails } = useWorkoutDetailsStore();
  const {
    workoutSession,
    addExerciseToRound,
    startWorkout,
    updateWorkoutSession,
  } = useWorkoutSession();
  const { data, error, isLoading, request } = useApiRequest();
  const workoutStarted = workoutSession.start && workoutSession.rounds.length;
  const exercise = findExercise();
  const restTime = findTimeRest();
  const time = new Date();
  time.setSeconds(time.getSeconds() + restTime);

  const { seconds, isRunning, start, pause, resume } = useTimer({
    expiryTimestamp: time,
    onExpire: timerExpired,
  });

  async function timerExpired() {
    const roundNumber = workoutSession.rounds.length || 1;
    request("/api/wod/progress", "POST", {
      userWorkoutSessionId: workoutSession.userSessionWorkoutId,
      exerciseId: exercise.exerciseId,
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

  useEffect(() => {
    if (data) {
      startWorkout();
      addExerciseInRound(data);
    }
  }, [data]);

  function findTimeRest() {
    let rest = 5;

    if (workoutStarted) {
      const currentRound =
        workoutSession.rounds[workoutSession.rounds.length - 1];
      const exerciseFinished = currentRound[currentRound.length - 1];
      rest = exerciseFinished.rest;
    }
    return rest;
  }

  function findExercise() {
    let exercise = workoutDetails.WorkoutRounds[0].Rounds.RoundExercises[0];
    if (workoutStarted) {
    }

    return exercise;
  }

  function returnPrevious() {
    let updateSession = {};
    if (workoutStarted) {
    } else {
      updateSession.returnStart = true;
      updateSession.preStart = false;
    }

    updateWorkoutSession(updateSession);
  }

  return (
    <div className={styles.containerWorkoutInProgress}>
      <Rest rest={seconds} />
      <div>
        <NextExercise reps={exercise.reps} name={exercise.Exercises.name} />
        <ControlTime
          returnPrevious={returnPrevious}
          isRunning={isRunning}
          start={start}
          pause={pause}
          resume={resume}
        />
      </div>
    </div>
  );
}
