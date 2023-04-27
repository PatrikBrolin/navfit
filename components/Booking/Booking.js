import styles from "./Booking.module.scss";
import { useState, useEffect } from "react";
import cn from "classnames";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";


export default function Booking({ data }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepText, setStepText] = useState(data?.items);

 
  
  const handleStep = (e) => {
    setCurrentStep(e.target.id);
  };

  const getProgressBarWidth = () => {
    const progress = ((currentStep - 1) / (data?.items?.length - 1)) * 100;
    return `${progress}%`;
  };
  return (
    <div className={styles.bookingContainer}>
      <main className={styles.progressBarContainer}>
        <div className={styles.progressBar}>
          <ul className={styles.ul}>
            {data?.items?.map((item, i) => {
              return (
                <li
                  key={i}
                  id={item?.steg}
                  className={cn(
                    styles.li,
                    currentStep >= item?.steg && styles.active
                  )}
                  onClick={handleStep}
                >
                  {item.steg}
                </li>
              );
            })}
          </ul>
          <div className={styles.progress}>
            <span style={{ width: getProgressBarWidth() }}></span>
          </div>
        </div>
        <section className={styles.textContainer}>
            {documentToReactComponents(stepText[currentStep - 1 ]?.stegText?.json)}
        </section>
      </main>
    </div>
  );
}
