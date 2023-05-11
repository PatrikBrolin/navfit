import styles from "./Price.module.scss";
import Contact from "@/components/Index/Contact/Contact";
export default function Price({ data }) {
  return (
    <section className={styles.priceContainer}>
      <h2 className={styles.h2}>Kontakta mig nu!</h2>
      <div className={styles.contentWrapper}>
        <ul className={styles.ul}>
          {data?.items?.map((item, i) => {
            return (
              <li key={i}>
                <h3>{item?.kategori}:</h3> <p>{item?.kostnad}</p>
              </li>
            );
          })}
        </ul>
        <Contact />
      </div>
    </section>
  );
}
