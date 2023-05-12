import styles from "./CheckBox.module.scss";

export default function CheckBox({ name, labelText, click, checked, reference }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={checked ? styles.checked: null}>{labelText}</label>
      <input type="checkbox" name={name} id={name} onChange={click} ref={reference} />
    </div>
  );
}
