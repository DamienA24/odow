import { isDate } from "util/types";
import prisma from "../prisma";
import { date } from "joi";

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

export const deleteUserWorkoutIdSession = async (userId, workoutId) => {
  const userSessionRemoved = await prisma.userWorkoutSessions.deleteMany({
    where: {
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
