import React, { useState } from "react";

function useCurrentDate() {
  const [date, setDate] = useState(new Date());

  const formattedDate = date.toISOString().split("T")[0];

  return formattedDate;
}

export default useCurrentDate;
