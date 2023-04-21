import styles from "./Hero.module.scss";

export default function Hero({ data }) {
  console.log(data);
  return (
    <section className={styles.heroWrapper}>
      <img src={data.backgrundsbild.url} className={styles.heroImg} />
      <div className={styles.textContent}>
        <h2>{data.rubrik}</h2>
        <p>{data.undertext}</p>
        <button>{data.callToActionKnapp}</button>
      </div>
    </section>
  );
}
