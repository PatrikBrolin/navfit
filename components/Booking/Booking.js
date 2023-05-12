import styles from "./Booking.module.scss";
import { useState, useEffect } from "react";
import cn from "classnames";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";


export default function Booking({ data }) {
  const [currentStep, setCurrentStep] = useState(1); // state thats keeps track of what slide to show
  const [stepText, setStepText] = useState(data?.items); // state that keeps the correct text property

 
  
  // function that handles change of the slide 
  const handleStep = (e) => {
    setCurrentStep(e.target.id);
  };

  // function that handles animation and and sets the with of "orange bar to the correct width"
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
        <div className={styles.textContainer}>
            {documentToReactComponents(stepText[currentStep - 1 ]?.stegText?.json)}
        </div>
      </main>
    </div>
  );
}
