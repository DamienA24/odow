import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import UnAuthenticated from "../components/UnAuthenticated";
import { useRouter } from "next/router";

export default function Workout() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  return (
    <div>
      {status === "loading" ? (
        <p style={{ color: "red" }}>loading</p>
      ) : (
        <p style={{ color: "red" }}>workout soon</p>
      )}
    </div>
  );
}
