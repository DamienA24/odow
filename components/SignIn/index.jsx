import styles from "./styles/Form.module.scss";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function Form() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/workout");
  }

  return (
    <div className={styles.containerForm}>
      {session ? (
        /*//TODO CREATE COMPONENT BUTTON SIGNOUT* */
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button onClick={() => signIn(undefined, { callbackUrl: "/workout" })}>
          Sign In
        </button>
      )}
    </div>
  );
}

export default Form;
