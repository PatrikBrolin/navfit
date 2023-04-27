import styles from "./About.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import cn from "classnames";

export default function ShortIntroduction({ data }) {
  const router = useRouter();
  const redirect = () => {
    router.push("/om-mig");
  };
  return (
    <section className={styles.introductionContainer}>
      <img className={styles.img} src={data?.items[0]?.bild?.url} alt={data?.items[0]?.bildText} />
      <div className={styles.textSection}>
        <aside className={styles.aside}>
          <div className={styles.border}></div>
          {documentToReactComponents(data?.items[0]?.kortIntroduktion?.json)}
          <button className={styles.button} onClick={redirect} aria-label="Kontakta mig knapp">
            <div className={cn(styles.buttonDesign)}>
              <img src="./icons/caret.png" alt="Triangel ikon"/>
            </div>
            Läs mer
          </button>
        </aside>
      </div>
    </section>
  );
}
