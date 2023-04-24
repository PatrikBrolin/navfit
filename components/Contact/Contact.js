import styles from "./Contact.module.scss";
import dynamic from "next/dynamic";
import EmailForm from "./EmailForm/EmailForm";
const Map = dynamic(() => import("./Map/Map"), { ssr: false });

export default function Contact({ data }) {
  return (
    <main className={styles.contactContainer}>
      <section className={styles.contactInfoWrapper}>
        <h2>Kontaktuppgifter</h2>
        <ul>
          <li>
            <img src="./icons/mail.svg" />
            {data?.items[0].email}
          </li>
          <li>
            <img src="./icons/phone.svg" />
            {data?.items[0].telefonnummer}
          </li>
        </ul>
        <EmailForm />
      </section>

      <section className={styles.map}>
      <h2>Platser</h2>
        <ul>
          <li>  <img src="./icons/location.png" />Actic Salem, Säbyvägen 19, 144 30 Rönninge</li>
          <li>  <img src="./icons/location.png" />Actic Hammarbysjöstad, Skeppsmäklargatan 1, 120 69 Stockholm</li>
        </ul>
        <div className={styles.mapContainer}>
          <Map />
        </div>
      </section>
    </main>
  );
}
