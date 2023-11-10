import Rest from "./components/Rest";

import { useTimer } from "react-timer-hook";

import useWorkoutDetailsStore from "stores/useWorkoutDetailsStore";
import useWorkoutSession from "stores/useWorkoutSession";

import styles from "./styles/WorkoutInProgress.module.scss";
import NextExercise from "./components/NextExercise";
import ControlTime from "./components/ControlTime";
import useApiRequest from "hooks/useApiRequest";

export default function WorkoutInProgress() {
  const { workoutDetails } = useWorkoutDetailsStore();
  const { workoutSession } = useWorkoutSession();
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
    request("/api/wod/progress", "POST", {
      userWorkoutSessionId: workoutSession.userSessionWorkoutId,
      exerciseId: exercise.exerciseId,
      roundNumber: 1,
      roundId: workoutDetails.WorkoutRounds[0].roundId,
    });
  }

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

  return (
    <div className={styles.containerWorkoutInProgress}>
      <Rest rest={seconds} />
      <div>
        <NextExercise reps={exercise.reps} name={exercise.Exercises.name} />
        <ControlTime
          isRunning={isRunning}
          start={start}
          pause={pause}
          resume={resume}
        />
      </div>
    </div>
  );
}
