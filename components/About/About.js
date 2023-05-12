import styles from "./About.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function About({ data }) {

  return (
    <div className={styles.aboutContainer}>
      <main>
      <section className={styles.education}>
        <h2>Utbildning:</h2>
        { /* documentToReactComponents is a contentful function uset to write out the contenful rich text property */ }
        {documentToReactComponents(data?.items[0]?.utbildning?.json)}
      </section>
      <section className={styles.aboutText}>
      <h2>Bakgrund:</h2>
      { /* documentToReactComponents is a contentful function uset to write out the contenful rich text property */ }
        {documentToReactComponents(data?.items[0]?.paragrafText?.json)}
      </section>
      <section className={styles.certificates}>
        <h2>Certifikat:</h2>
        { /* documentToReactComponents is a contentful function uset to write out the contenful rich text property */ }
        {documentToReactComponents(data?.items[0]?.certifikat?.json)}
      </section>
      </main>
      <div className={styles.imageContainer}>
        <img src={data?.items[0]?.bild?.url} alt={data?.items[0]?.bildText} />
      </div>
    </div>
  );
}
