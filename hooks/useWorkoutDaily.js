import useSWR from "swr";

import fetcher from "../utils/fetcher";
import useCurrentDate from "./useCurrentDate";

function useWorkoutDaily() {
  const date = useCurrentDate();
  console.log(date);
  const { data, error, isLoading } = useSWR(
    `/api/wod/daily?date=${date}`,
    fetcher
  );

  console.log(data);

  return {
    workout: data,
    isLoading,
    isError: error,
  };
}

export default useWorkoutDaily;
