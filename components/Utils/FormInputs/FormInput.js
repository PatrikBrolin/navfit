import styles from "./FormInput.module.scss";

export default function FormInput({
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
      <input
        type={type}
        id={name}
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
