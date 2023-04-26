import styles from "./About.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { useEffect, useState } from "react";
export default function About({ data }) {
  console.log(data?.items[0]);
  return (
    <div className={styles.aboutContainer}>
      <main>
      <section className={styles.education}>
        <h3>Utbildning:</h3>
        {documentToReactComponents(data?.items[0]?.utbildning?.json)}
      </section>
      <section className={styles.aboutText}>
      <h3>Bakgrund:</h3>
        {documentToReactComponents(data?.items[0]?.paragrafText?.json)}
      </section>
      <section className={styles.certificates}>
        <h3>Certifikat:</h3>
        {documentToReactComponents(data?.items[0]?.certifikat?.json)}
      </section>
      </main>
      <aside className={styles.imageContainer}>
        <img src={data?.items[0]?.bild?.url} />
      </aside>
    </div>
  );
}
