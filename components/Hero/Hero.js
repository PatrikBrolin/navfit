import styles from "./Hero.module.scss";
import cn from "classnames";
import GeneratedTitle from "../Utils/GenerateTitle/GeneratedTitle";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Hero({ data }) {
  const router = useRouter();
  const redirect = () => {
    router.push("/kontakt");
  };
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.imageContainer}>
        <Image
        loading="eager"
          src={data?.items[0]?.backgrundsbild.url}
          alt={data?.items[0]?.bildText}
          width={100}
          height={100}
          layout="responsive"
        />
      </div>
  
      <div className={styles.textContent}>
        <GeneratedTitle headline={data?.items[0]?.rubrik} />
        <p>{data?.items[0]?.undertext}</p>
        <button className={styles.button} onClick={redirect}>
          <span className={cn(styles.buttonDesign)}>
            <Image
              src="/icons/caret.png"
              alt="Triangel icon"
              height={30}
              width={30}
            />
          </span>
          {data?.items[0]?.callToActionKnapp}
        </button>
      </div>
    </section>
  );
}
