import styles from "./TextAreaInput.module.scss";


export default function TextAreaInput({
  labelText,
  value,
  handleInput,
  name,
  type,
  error,
  errorText
}) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{labelText}</label>
      <textarea
        type={type}
        id={name}
        rows="3"
        name={name}
        onChange={handleInput}
        value={value}
      />
        {error && (
        <div className={styles.errorContainer}>
          <img src="./icons/error.png" /> <p>{errorText}</p>
        </div>
      )}
    </div>
  );
}
