import styles from "./CheckBox.module.scss";
import { useState } from "react";
export default function CheckBox({ name, labelText, click, checked, reference }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={checked && styles.checked}>{labelText}</label>
      <input type="checkbox" name={name} id={name} onChange={click} ref={reference} />
      {/* {error && (
        <div className={styles.errorContainer}>
          <img src="./icons/error.png" /> <p>{errorText}</p>
        </div>
      )} */}
    </div>
  );
}
