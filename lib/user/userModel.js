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
  const userSessionExist = await prisma.userWorkoutSessions.findFirst({
    where: {
      userId,
      workoutId,
      endDate: null,
    },
  });

  return userSessionExist;
};

export const deleteUserWorkoutIdSession = async (
  sessionId,
  userId,
  workoutId
) => {
  const userSessionRemoved = await prisma.userWorkoutSessions.deleteMany({
    where: {
      id: sessionId,
      userId,
      workoutId,
    },
  });

  return userSessionRemoved;
};

export const checkUserWorkoutSessionCompleted = async (
  idUserWorkoutSession,
  userId,
  workoutId
) => {
  const userSessionCompleted = await prisma.userWorkoutSessions.findFirst({
    where: {
      id: idUserWorkoutSession,
      userId,
      workoutId,
      endDate: { not: null },
    },
  });

  return userSessionCompleted;
};

export const completeUserWorkoutSession = async (
  idUserWorkoutSession,
  date
) => {
  const startUserSession = await prisma.userWorkoutSessions.update({
    where: {
      id: idUserWorkoutSession,
    },
    data: { endDate: date },
  });

  return startUserSession;
};

export const completeUserWorkoutSessionTotalSecondsSpent = async (
  idUserWorkoutSession,
  totalSeconds
) => {
  const totalSecondsSession = await prisma.userWorkoutSessions.update({
    where: {
      id: idUserWorkoutSession,
    },
    data: { totalSecondsSpent: totalSeconds },
  });
  return totalSecondsSession;
};
