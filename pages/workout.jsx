import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Workout() {
  const { data: session, status } = useSession();
  return (
    <div>
      {status === "loading" ? (
        <p style={{ color: "red" }}>loading</p>
      ) : session ? (
        <p style={{ color: "red" }}>workout soon</p>
      ) : (
        <p style={{ color: "red" }}>you need to log in</p>
      )}
    </div>
  );
}
