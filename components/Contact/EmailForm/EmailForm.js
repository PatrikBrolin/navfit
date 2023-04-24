import styles from "./EmailForm.module.scss";
import emailjs from "emailjs-com";
import { useState } from "react";
import { ValidateEmail } from "@/lib/helpFunctions";
import cn from "classnames";
import FormInput from "@/components/Utils/FormInputs/FormInput";
import TextAreaInput from "@/components/Utils/FormInputs/TextAreaInput";

export default function EmailForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleInputChange = (event) => {
    setFormError(false);
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.name === "name") {
      setNameError(false);
    }
    if (event.target.name === "email") {
      setEmailError(false);
    }
    if (event.target.name === "message") {
      setMessageError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(false);
    const validateName = formData?.name?.trim().length > 0;
    const validateEmail = ValidateEmail(formData?.email);
    const validateMessage = formData?.message.trim().length > 0;
    if (!validateName) {
      setNameError(true);
    }
    if (!validateEmail) {
      setEmailError(true);
    }
    if (!validateMessage) {
      setMessageError(true);
    }
    if (validateName && validateEmail && validateMessage) {
      setLoading(true);
      emailjs
        .send(
          process.env.NEXT_PUBLIC_SERVICEID,
          process.env.NEXT_PUBLIC_TEMPLATEID,
          formData,
          process.env.NEXT_PUBLIC_PUBLICKEY
        )
        .then(
          (result) => {
            setLoading(false);
            setFormData({ name: "", email: "", message: "" });
            console.log(result);
          },
          (error) => {
            setFormError(true);
            setLoading(false);
            console.log(error);
          }
        );
    }
  };
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormInput
          labelText={"Namn"}
          value={formData.name}
          handleInput={(e) => {
            handleInputChange(e);
          }}
          name={"name"}
          type={"text"}
          error={nameError}
          errorText="Fyll i ditt namn"
        />
        <FormInput
          labelText={"Email"}
          value={formData.email}
          handleInput={(e) => {
            handleInputChange(e);
          }}
          name={"email"}
          type={"text"}
          error={emailError}
          errorText="Fyll i en korrekt mailadress"
        />
        <TextAreaInput
          labelText={"Meddelande"}
          value={formData.message}
          handleInput={(e) => {
            handleInputChange(e);
          }}
          name={"message"}
          type={"text"}
          error={messageError}
          errorText="Skriv ett meddelande"
        />
        <button className={styles.button}>
          <div
            className={cn(styles.buttonDesign, loading && styles.buttonLoading)}
          >
            <img src="./icons/caret.png" />
          </div>
          Skicka
        </button>
        {formError && (
          <div className={styles.formErrorContainer}>
            <img src="./icons/error.png" />{" "}
            <p>
              Ursäkta, något gick fel vid skickandet av meddelandet. Försökt
              gärna igen!{" "}
            </p>
          </div>
        )}
      </form>
    </>
  );
}
