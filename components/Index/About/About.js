import styles from "./About.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import cn from "classnames";
import Image from "next/image";

export default function ShortIntroduction({ data }) {
  const router = useRouter();
  const redirect = () => {
    router.push("/om-mig");
  };
  return (
    <section className={styles.introductionContainer}>
      <div className={styles.imageContainer}>
        <h2>Kort om mig</h2>
        <img
          className={styles.img}
          src={data?.items[0]?.bild?.url}
          alt={data?.items[0]?.bildText}
        />
      </div>

      <div className={styles.textSection}>
        <div className={styles.about}>
          <div className={styles.border}></div>
          {documentToReactComponents(data?.items[0]?.kortIntroduktion?.json)}
          <button
            className={styles.button}
            onClick={redirect}
            aria-label="Kontakta mig knapp"
          >
            <div className={cn(styles.buttonDesign)}>
              <Image
                src="/icons/caret.png"
                alt="Triangel ikon"
                height={30}
                width={30}
              />
            </div>
            Läs mer
          </button>
        </div>
      </div>
    </section>
  );
}
