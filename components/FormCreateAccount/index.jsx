import styles from "../../styles/Form.module.scss";

function Form() {
  return (
    <div className={styles.containerForm}>
      <form action="/send-data-here" method="post">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" />
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label for="password">Name:</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Form;
