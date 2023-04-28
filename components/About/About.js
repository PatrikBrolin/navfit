import styles from "./About.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { useEffect, useState } from "react";
export default function About({ data }) {
  return (
    <div className={styles.aboutContainer}>
      <main>
      <section className={styles.education}>
        <h2>Utbildning:</h2>
        {documentToReactComponents(data?.items[0]?.utbildning?.json)}
      </section>
      <section className={styles.aboutText}>
      <h2>Bakgrund:</h2>
        {documentToReactComponents(data?.items[0]?.paragrafText?.json)}
      </section>
      <section className={styles.certificates}>
        <h2>Certifikat:</h2>
        {documentToReactComponents(data?.items[0]?.certifikat?.json)}
      </section>
      </main>
      <aside className={styles.imageContainer}>
        <img src={data?.items[0]?.bild?.url} alt={data?.items[0]?.bildText} />
      </aside>
    </div>
  );
}
