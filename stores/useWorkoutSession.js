import { devtools } from "zustand/middleware";
import { create } from "zustand";

const exercise = {
  idUserWorkoutProgress: null,
  roundId: null,
  exerciseId: null,
  roundNumber: null,
  rest: null,
  completed: false,
};

const initialWorkoutSession = () => ({
  userSessionWorkoutId: null,
  userId: "",
  workoutId: null,
  preStart: false,
  returnPrevious: false,
  returnStart: false,
  start: false,
  end: false,
  pause: false,
  rest: false,
  resumed: false,
  rounds: [],
});

const useWorkoutSession = create(
  devtools((set) => ({
    workoutSession: initialWorkoutSession(),
    updateWorkoutSession: (newWorkoutSession) =>
      set((state) => ({
        workoutSession: { ...state.workoutSession, ...newWorkoutSession },
      })),
    startWorkout: () =>
      set((state) => ({
        workoutSession: { ...state.workoutSession, start: true },
      })),
    endWorkout: () =>
      set((state) => ({
        workoutSession: { ...state.workoutSession, end: true },
      })),
    pauseWorkout: () =>
      set((state) => ({
        workoutSession: { ...state.workoutSession, pause: true },
      })),
    resumeWorkout: () =>
      set((state) => ({
        workoutSession: { ...state.workoutSession, resumed: true },
      })),
    addExerciseToRound: (roundIndex, newExercise) =>
      set((state) => {
        const updatedRounds = state.workoutSession.rounds.slice();

        if (!updatedRounds[roundIndex]) {
          updatedRounds[roundIndex] = [];
        }
        updatedRounds[roundIndex].push(newExercise);

        return {
          workoutSession: {
            ...state.workoutSession,
            rounds: updatedRounds,
          },
        };
      }),
    updateExerciseInRound: (roundIndex, exerciseId, updatedExerciseData) =>
      set((state) => {
        const updatedRounds = state.workoutSession.rounds.slice();
        const exerciseIndex = updatedRounds[roundIndex].findIndex(
          (existingExercise) => existingExercise.exerciseId === exerciseId
        );
        if (exerciseIndex !== -1) {
          updatedRounds[roundIndex][exerciseIndex] = {
            ...updatedRounds[roundIndex][exerciseIndex],
            ...updatedExerciseData,
          };
          return {
            workoutSession: {
              ...state.workoutSession,
              rounds: updatedRounds,
            },
          };
        }
        return state;
      }),
    resetWorkoutSession: () => set({ workoutSession: initialWorkoutSession() }),
  }))
);

export default useWorkoutSession;
