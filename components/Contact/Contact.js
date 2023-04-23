import styles from "./Contact.module.scss";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("./Map/Map"), { ssr: false });

export default function Contact({ data }) {
  return (
    <main className={styles.contactContainer}>
      <section className={styles.contactInfoWrapper}>
        <h2>Kontaktuppgifter</h2>
        <ul>
          <li><img src="./icons/mail.svg"/>{data?.items[0].email}</li>
          <li><img src="./icons/phone.svg"/>{data?.items[0].telefonnummer}</li>
        </ul>
      </section>
      <section className={styles.map}>
        <Map />
      </section>
    </main>
  );
}
