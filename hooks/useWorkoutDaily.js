import useSWR from "swr";

import fetcher from "../utils/fetcher";
import useCurrentDate from "./useCurrentDate";

function useWorkoutDaily() {
  const date = useCurrentDate();
  const { data, error, isLoading } = useSWR(
    `/api/wod/daily?date=${date}`,
    fetcher
  );

  return {
    workout: data,
    isLoading,
    isError: error,
  };
}

export default useWorkoutDaily;
