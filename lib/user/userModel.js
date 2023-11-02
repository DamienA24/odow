import prisma from "../prisma";

export const retrieveUserIdByEmail = async (email) => {
  const userId = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return userId;
};

export const startUserWorkoutSession = async (userId, workoutId, startDate) => {
  const startUserSession = await prisma.userWorkoutSessions.create({
    data: {
      userId,
      workoutId,
      startDate,
    },
  });

  return startUserSession;
};

export const checkUserWorkoutSessionExist = async (userId, workoutId) => {
  const userSessionExist = await prisma.userWorkoutSessions.findMany({
    where: {
      userId,
      workoutId,
    },
  });

  return userSessionExist;
};

export const deleteUserWorkoutIdSession = async (userId, workoutId) => {
  const userSessionRemoved = await prisma.userWorkoutSessions.deleteMany({
    where: {
      userId,
      workoutId,
    },
  });

  return userSessionRemoved;
};
