import styles from "./Accordion.module.scss";
import { useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useEffect } from "react";
export default function Accordion({ question, awnser }) {
  const [accordionOpen, setAccordionOpen] = useState(true);
  
  useEffect(() => {
    setAccordionOpen(false)
  }, [])

  return (
    <div className={styles.faqWrapper}>
      <div
        className={styles.faqQuestionWrapper}
        onClick={() => {
          setAccordionOpen(!accordionOpen);
        }}
      >
        <h3>{question}</h3>
        <img src={accordionOpen ? "./icons/minus.svg" : "./icons/plus.svg"} />
      </div>

      {accordionOpen && (
        <div className={styles.awnser}>
          {documentToReactComponents(awnser?.json)}
        </div>
      )}
    </div>
  );
}
