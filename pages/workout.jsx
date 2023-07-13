import { useSession, signIn, signOut } from "next-auth/react";

export default function Workout() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <p style={{ color: "red" }}>workout soon</p>
      ) : (
        <p style={{ color: "red" }}>you need to log in</p>
      )}
    </div>
  );
}
