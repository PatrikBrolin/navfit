import styles from "./Hero.module.scss";
import cn from "classnames";
import GeneratedTitle from "../Utils/GenerateTitle/GeneratedTitle";
export default function Hero({ data }) {
  return (
    <section className={styles.heroWrapper}>
      <img
        src={data?.items[0]?.backgrundsbild.url}
        className={styles.heroImg}
      />
      <div className={styles.textContent}>
        <h2>{data?.items[0]?.rubrik}</h2>
        <GeneratedTitle headline={data?.items[0]?.undertext}/>
        <button className={styles.button}>
          <div className={cn(styles.buttonDesign)}>
            <img src="./icons/caret.png" />
          </div>
          {data?.items[0]?.callToActionKnapp}
        </button>
      </div>
    </section>
  );
}
