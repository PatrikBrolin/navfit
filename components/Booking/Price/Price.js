import styles from "./Price.module.scss";
import Contact from "@/components/Index/Contact/Contact";
export default function Price({ data }) {
  return (
    <section className={styles.priceContainer}>
      <ul className={styles.ul}>
        {data?.items?.map((item, i) => {
          return (
            <li key={i}>
              <h2>{item?.kategori}:</h2> <p>{item?.kostnad}</p>
            </li>
          );
        })}
      </ul>
      <Contact />
    </section>
  );
}
