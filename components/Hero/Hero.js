import styles from "./Hero.module.scss";
import cn from "classnames";
import GeneratedTitle from "../Utils/GenerateTitle/GeneratedTitle";
import Image from "next/image";
export default function Hero({ data }) {
  return (
    <section className={styles.heroWrapper}>
      <img
        src={data?.items[0]?.backgrundsbild.url}
        alt={data?.items[0]?.bildText}
        className={styles.heroImg}
      />
      <div className={styles.textContent}>
        {/* <h2>{data?.items[0]?.rubrik}</h2> */}
        <GeneratedTitle headline={data?.items[0]?.rubrik}/>
        <p>{data?.items[0]?.undertext}</p>
        <button className={styles.button}>
          <div className={cn(styles.buttonDesign)}>
            <Image src="/icons/caret.png" alt="Triangel icon" height={30} width={30}/>
          </div>
          {data?.items[0]?.callToActionKnapp}
        </button>
      </div>
    </section>
  );
}
