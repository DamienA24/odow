import { devtools } from "zustand/middleware";
import { create } from "zustand";

const initialWorkoutDetails = () => ({
  id: null,
  name: "",
  durationInMinutes: null,
  description: "",
  BodyParts: {
    partName: "",
  },
  date: "",
  calories: null,
  WorkoutRounds: [
    {
      roundId: "",
      Rounds: {
        number: 2,
        rest: 60,
        RoundExercises: [
          {
            exerciseId: null,
            Exercises: {
              name: "",
              description: "",
              urlVideo: "",
              DifficultyLevels: {
                levelName: "",
              },
              ExerciseBodyParts: [
                {
                  BodyParts: {
                    partName: "",
                  },
                },
                {
                  BodyParts: {
                    partName: "",
                  },
                },
                {
                  BodyParts: {
                    partName: "",
                  },
                },
              ],
            },
            reps: null,
            rest: null,
            order: null,
          },
        ],
      },
    },
  ],
});

const useWorkoutDetailsStore = create(
  devtools((set) => ({
    workoutDetails: initialWorkoutDetails(),
    updateWorkoutDetails: (newWorkoutDetails) =>
      set({ workoutDetails: newWorkoutDetails }),
  }))
);

export default useWorkoutDetailsStore;
