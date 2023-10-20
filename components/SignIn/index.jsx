import styles from "./styles/Form.module.scss";
import { useSession, signIn, signOut } from "next-auth/react";

function Form() {
  const { data: session } = useSession();

  return (
    <div className={styles.containerForm}>
      {session ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => signIn(undefined, { callbackUrl: "/workout" })}>
          Sign in
        </button>
      )}
    </div>
  );
}

export default Form;
