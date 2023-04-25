import styles from "./Contact.module.scss";
import FormInput from "@/components/Utils/FormInputs/FormInput";
import CheckBox from "@/components/Utils/FormInputs/CheckBox";
import { useState, useRef } from "react";
import cn from "classnames";
import emailjs from "emailjs-com";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [formError, setFormError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
  });
  const [trainingType, setTrainingType] = useState({
    personligträning: false,
    kostrådgivning: false,
    kampsport: false,
    annat: false,
  });

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

  const handleCheckBox = (e) => {
    setTypeError(false);
    setTrainingType({ ...trainingType, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateName = formData?.name?.trim().length > 0;
    const validatePhonenumber = formData?.phonenumber?.trim().length > 0;
    const validateTrainingType =
      trainingType?.personligträning ||
      trainingType?.kostrådgivning ||
      trainingType?.kampsport ||
      trainingType?.annat;

    if (!validateName) {
      setNameError(true);
    }
    if (!validatePhonenumber) {
      setPhoneError(true);
    }
    if (!validateTrainingType) {
      setTypeError(true);
    }
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
            })
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
    <section className={styles.contact}>
      <div className={styles.textContainer}>
        <h2>Vill du boka tid?</h2>
        <p>
          Är du intresserad av att boka tid eller har några andra frågor? Fyll i
          dina uppgifter och vad du är intresserad av för upplägg så hör jag av
          mig så fort jag kan.
        </p>
      </div>

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
              <img src="./icons/error.png" /> <p>Vänligen välj någon typ</p>
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
        <button className={styles.button}>
          <div
            className={cn(styles.buttonDesign, loading && styles.buttonLoading)}
          >
            <img src="./icons/caret.png" />
          </div>
          Skicka
        </button>
      </form>
    </section>
  );
}
