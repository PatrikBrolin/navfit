import styles from "./Reviews.module.scss";
import Review from "./Review/Review";
export default function Reviews({ data }) {
  return (
    <>

      {data?.items?.length > 0 && (
        <section className={styles.reviewsContainer}>
          <h2 className={styles.h2}>Recensioner</h2>
          <ul className={styles.ul}>
            {data?.items.map((review, i) => (
              <Review key={i} data={review} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
