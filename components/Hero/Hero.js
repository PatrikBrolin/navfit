import styles from "./Hero.module.scss";

export default function Hero({ data }) {
  return (
    <section className={styles.heroWrapper}>
      <img src={data.items[0].backgrundsbild.url} className={styles.heroImg} />
      <div className={styles.textContent}>
        <h2>{data.items[0].rubrik}</h2>
        <p>{data.items[0].undertext}</p>
        <button>{data.items[0].callToActionKnapp}</button> 
     </div>
    </section>
  );
}
