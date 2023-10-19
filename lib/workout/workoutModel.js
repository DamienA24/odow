import prisma from "../prisma";

export const getWorkoutDetails = async (date) => {
  const workoutDetails = await prisma.workouts.findFirst({
    where: {
      date,
    },
    select: {
      id: true,
      name: true,
      durationInMinutes: true,
      description: true,
      date: true,
      calories: true,
      BodyParts: {
        select: {
          partName: true,
        },
      },
      WorkoutRounds: {
        orderBy: {
          roundId: "asc",
        },
        select: {
          roundId: true,
          Rounds: {
            select: {
              number: true,
              rest: true,
              RoundExercises: {
                orderBy: {
                  order: "asc",
                },
                select: {
                  exerciseId: true,
                  Exercises: {
                    select: {
                      name: true,
                      description: true,
                      urlVideo: true,
                      DifficultyLevels: {
                        select: {
                          levelName: true,
                        },
                      },
                      ExerciseBodyParts: {
                        select: {
                          BodyParts: {
                            select: {
                              partName: true,
                            },
                          },
                        },
                      },
                    },
                  },
                  reps: true,
                  rest: true,
                  order: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return workoutDetails;
};
