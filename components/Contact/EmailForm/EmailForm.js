import styles from "./EmailForm.module.scss";
import emailjs from "emailjs-com";
import { useState } from "react";
import { ValidateEmail } from "@/lib/helpFunctions";
import cn from "classnames";
import FormInput from "@/components/Utils/FormInputs/FormInput";
import TextAreaInput from "@/components/Utils/FormInputs/TextAreaInput";
import Image from "next/image";

export default function EmailForm() {
  // state that handles the users input 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false); // state to handle loading phase 
  const [nameError, setNameError] = useState(false); // state for error validation
  const [emailError, setEmailError] = useState(false); // state for error validation
  const [messageError, setMessageError] = useState(false); // state for error validation
  const [formError, setFormError] = useState(false); // state for error validation

  // function that handles input from the user and place it in the correct property in the formData state
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
  // submit function to handle the submiting of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(false);
     // validation that all the inputfield and required data is filled in 
    const validateName = formData?.name?.trim().length > 0;
    const validateEmail = ValidateEmail(formData?.email);
    const validateMessage = formData?.message.trim().length > 0;
     // setting error messages if any validation rule is not fullfilled
    if (!validateName) {
      setNameError(true);
    }
    if (!validateEmail) {
      setEmailError(true);
    }
    if (!validateMessage) {
      setMessageError(true);
    }
     // if all validation rules is fullfilled i call the the emailJs api with the data from the user
    // emailJS is a email service to handle sending emails form a form
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
        <button className={styles.button} aria-label="Skicka meddelande knapp">
          <div
            className={cn(styles.buttonDesign, loading && styles.buttonLoading)}
          >
            <Image
              src="/icons/caret.png"
              alt="Triangel icon"
              height={30}
              width={30}
            />
          </div>
          Skicka
        </button>
        {formError && (
          <div className={styles.formErrorContainer}>
            <Image
              src="/icons/error.png"
              alt="Error meddelande ikon"
              height={20}
              width={20}
            />
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
