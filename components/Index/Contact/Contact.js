import styles from "./Contact.module.scss";
import FormInput from "@/components/Utils/FormInputs/FormInput";
import CheckBox from "@/components/Utils/FormInputs/CheckBox";
import { useState, useRef } from "react";
import cn from "classnames";
import emailjs from "emailjs-com";
import Image from "next/image";

export default function Contact({ showText, extraPadding }) {
  const [loading, setLoading] = useState(false); // state used to handle loading phase of sending a email
  const [nameError, setNameError] = useState(false);  // state to handle error validation
  const [phoneError, setPhoneError] = useState(false); // state to handle error validation
  const [typeError, setTypeError] = useState(false); // state to handle error validation
  const [formError, setFormError] = useState(false); // state to handle error validation

  //state to save the input data from the user
  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
  });

  // state to save the checkbox data that the user clickes
  const [trainingType, setTrainingType] = useState({
    personligträning: false,
    kostrådgivning: false,
    kampsport: false,
    annat: false,
  });

  //function that handles input form the user and assing the value to the correct property in formData state
  const handleInputChange = (event) => {
    setFormError(false);
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.name === "name") {
      setNameError(false);
    }
    if (event.target.name === "phonenumber") {
      setPhoneError(false);
    }
  };

  //function that handles input form the user and assing the value to the correct property in trainingType state
  const handleCheckBox = (e) => {
    setTypeError(false);
    setTrainingType({ ...trainingType, [e.target.name]: e.target.checked });
  };


  // submit function to handle the submiting of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // validation that all the inputfield and required data is filled in 
    const validateName = formData?.name?.trim().length > 0;
    const validatePhonenumber = formData?.phonenumber?.trim().length > 0;
    const validateTrainingType =
      trainingType?.personligträning ||
      trainingType?.kostrådgivning ||
      trainingType?.kampsport ||
      trainingType?.annat;

    // setting error messages if any validation rule is not fullfilled
    if (!validateName) {
      setNameError(true);
    }
    if (!validatePhonenumber) {
      setPhoneError(true);
    }
    if (!validateTrainingType) {
      setTypeError(true);
    }
    // if all validation rules is fullfilled i call the the emailJs api with the data from the user
    // emailJS is a email service to handle sending emails form a form
    if (validateName && validatePhonenumber && validateTrainingType) {
      setLoading(true);
      emailjs
        .send(
          process.env.NEXT_PUBLIC_SERVICEID,
          process.env.NEXT_PUBLIC_PHONENUMBERID,
          {
            name: formData?.name,
            phonenumber: formData?.phonenumber,
            message: `${
              trainingType.personligträning ? "Personlig träning" : ""
            }, ${trainingType.kostrådgivning ? "Kostrådgivning" : ""}, ${
              trainingType.kampsport ? "Kampsport" : ""
            }, ${trainingType.annat ? "Inget specifikt område" : ""}`,
          },
          process.env.NEXT_PUBLIC_PUBLICKEY
        ) 
        .then(
          (result) => {
            setLoading(false);
            setFormData({ name: "", phonenumber: "" });
            setTrainingType({
              personligträning: false,
              kostrådgivning: false,
              kampsport: false,
              annat: false,
            });
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
    <div className={cn(styles.contact, extraPadding && styles.extraPadding) }>
      {showText && (
        <div className={styles.textContainer}>
          <h2>Vill du boka tid?</h2>
          <p>
            Är du intresserad av att boka tid eller har några andra frågor? Fyll
            i dina uppgifter och vad du är intresserad av för upplägg så hör jag
            av mig så fort jag kan.
          </p>
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.checkboxes}>
          <ul>
            <li>
              <CheckBox
                name={"personligträning"}
                labelText={"Personlig träning"}
                click={handleCheckBox}
                checked={trainingType.personligträning}
              />
            </li>
            <li>
              <CheckBox
                name={"kostrådgivning"}
                labelText={"Kostrådgivning"}
                click={handleCheckBox}
                checked={trainingType.kostrådgivning}
              />
            </li>
            <li>
              <CheckBox
                name={"kampsport"}
                labelText={"Kampsport"}
                click={handleCheckBox}
                checked={trainingType.kampsport}
              />
            </li>
            <li>
              <CheckBox
                name={"annat"}
                labelText={"Annat"}
                click={handleCheckBox}
                checked={trainingType.annat}
              />
            </li>
          </ul>
          {typeError && (
            <div className={styles.errorContainer}>
              <img src="./icons/error.png" alt="Ikon som indikerar ett error" />{" "}
              <p>Vänligen välj någon typ</p>
            </div>
          )}
        </fieldset>
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
          labelText={"Telefonnummer"}
          value={formData.phonenumber}
          handleInput={(e) => {
            handleInputChange(e);
          }}
          name={"phonenumber"}
          type={"text"}
          error={phoneError}
          errorText="Fyll i ditt telefonnummer"
        />
        <button className={styles.button} aria-label="Kontakta mig knapp">
          <div
            className={cn(styles.buttonDesign, loading && styles.buttonLoading)}
          >
            <Image
              src="/icons/caret.png"
              alt="Triangel ikon"
              height={30}
              width={30}
            />
          </div>
          Skicka
        </button>
      </form>
    </div>
  );
}
