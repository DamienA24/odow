function formateWorkoutSession(workoutSessions) {
  const groupedByRound = workoutSessions.reduce((acc, obj) => {
    const key = obj.roundNumber;
    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(obj);
    return acc;
  }, {});

  return Object.values(groupedByRound).map((round) =>
    round.map((item) => ({
      idUserWorkoutProgress: item.id,
      roundId: item.roundId,
      exerciseId: item.exerciseId,
      roundNumber: item.roundNumber,
      rest: item.rest,
      completed: !!item.completedAt,
    }))
  );
}

export default formateWorkoutSession;
