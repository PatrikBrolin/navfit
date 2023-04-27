import styles from "./Contact.module.scss";
import dynamic from "next/dynamic";
import EmailForm from "./EmailForm/EmailForm";
import Image from "next/image";
const Map = dynamic(() => import("./Map/Map"), { ssr: false });

export default function Contact({ data }) {
  return (
    <main className={styles.contactContainer}>
      <section className={styles.contactInfoWrapper}>
        <h2>Kontaktuppgifter</h2>
        <ul>
          <li>
            <Image
              src="/icons/mail.svg"
              alt="Email ikon"
              height={25}
              width={25}
            />

            {data?.items[0].email}
          </li>
          <li>
            <Image
              src="/icons/phone.svg"
              alt="Telefon ikon"
              height={25}
              width={25}
            />

            {data?.items[0].telefonnummer}
          </li>
        </ul>
        <EmailForm />
      </section>

      <section className={styles.map}>
        <h2>Platser</h2>
        <ul>
          <li>
            <Image
              src="/icons/location.png"
              alt="Plats ikon"
              height={25}
              width={25}
            />
            Actic Salem, Säbyvägen 19, 144 30 Rönninge
          </li>
          <li>
            <Image
              src="/icons/location.png"
              alt="Plats ikon"
              height={25}
              width={25}
            />
            Actic Hammarbysjöstad, Skeppsmäklargatan 1, 120 69 Stockholm
          </li>
        </ul>
        <div className={styles.mapContainer}>
          <Map />
        </div>
      </section>
    </main>
  );
}
