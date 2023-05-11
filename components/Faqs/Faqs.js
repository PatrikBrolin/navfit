import styles from "./Faqs.module.scss";
import { useState, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Accordion from "./Accordion/Accordion";

export default function Faqs({ data }) {
  const [showFaq, setShowFaq] = useState(true);

  return (
    <div className={styles.faqContainer}>
      <section className={styles.faqWrapper}>
        <div className={styles.aside}>
          <h2>Frågor och svar</h2>
          <p>Hittar du inte svar på vad du letar efter? kontakta mig på <a  href="mailto:patrkbrolin@hotmail.com" >patrikbrolin@hotmail.com</a> </p>
        </div>
        <div className={styles.faqs}>
          {data?.items?.map(({ question, awnser, i }) => (
            <Accordion question={question} awnser={awnser} key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
