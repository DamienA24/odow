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
                      stickerVideo: true,
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

export const addUserWorkoutProgress = async (
  userWorkoutSessionId,
  exerciseId,
  roundNumber,
  roundId,
  date,
  rest
) => {
  const addUserWorkoutSession = await prisma.userWorkoutProgress.create({
    data: {
      userWorkoutSessionId,
      exerciseId,
      roundNumber,
      roundId,
      startedAt: date,
      rest,
    },
  });

  return addUserWorkoutSession;
};

export const getUserWorkoutProgress = async (userWorkoutSessionId) => {
  const userWorkoutProgress = await prisma.userWorkoutProgress.findMany({
    where: {
      userWorkoutSessionId,
    },
  });

  return userWorkoutProgress;
};

export const deleteUserWorkoutProgress = async (userWorkoutSessionId) => {
  const workoutProgressDeleted = await prisma.userWorkoutProgress.deleteMany({
    where: {
      userWorkoutSessionId,
    },
  });

  return workoutProgressDeleted;
};

export const editUserWorkoutProgress = async (idUserWorkoutProgress, date) => {
  const editWorkoutProgress = await prisma.userWorkoutProgress.update({
    where: { id: idUserWorkoutProgress },
    data: { completedAt: date },
  });

  return editWorkoutProgress;
};

export const checkWorkoutProgressExit = async (
  userWorkoutSessionId,
  roundNumber,
  exerciseId
) => {
  const workoutDetails = await prisma.userWorkoutProgress.findFirst({
    where: {
      userWorkoutSessionId,
      roundNumber,
      exerciseId,
    },
  });

  return workoutDetails;
};
