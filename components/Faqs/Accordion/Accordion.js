import styles from "./Accordion.module.scss";
import { useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
export default function Accordion({ question, awnser }) {
  const [accordionOpen, setAccordionOpen] = useState(false); // state that handles if FAQ should be open or not

  return (
    <div className={styles.faqWrapper}>
      <div
        className={styles.faqQuestionWrapper}
        onClick={() => {
          setAccordionOpen(!accordionOpen);
        }}
      >
        <h2>{question}</h2>
        <Image
          src={accordionOpen ? "/icons/minus.svg" : "/icons/plus.svg"}
          width={20}
          height={20}
          alt="Ikon över om fråga är öppen eller inte"
        />
      </div>

      {accordionOpen && (
        <div className={styles.awnser}>
           { /* documentToReactComponents is a contentful function uset to write out the contenful rich text property */ }
          {documentToReactComponents(awnser?.json)}
        </div>
      )}
    </div>
  );
}
