import styles from "@/components/Itinerary/Itinerary.module.css";
import Image from "next/image";

export default function Itinerary() {
  return (
    <main className={`${styles.mainContainer} ${styles.background}`}>
      <section className={styles.header}>
        <h1
          style={{
            fontFamily: "var(--heading-font)",
            fontSize: "var(--desktop-heading3)",
          }}
        >
          Trip Details
        </h1>
        <p
          style={{
            fontFamily: "var(--body-font)",
            fontSize: "var(--desktop-body-16pt)",
          }}
        >
          Here’s an itinerary, just for you!
        </p>
      </section>
      <section className={styles.scrollGroup}>
        <div className={styles.dayCard}>
          <Image
            className={styles.img}
            src="/images/day1-img.png"
            alt="trip thumbnail"
            width={223}
            height={243}
          />
          <div className={styles.textContainer}>
            <h2 className={styles.tripHeader}>
              Day 1: Arrival and Exploration
            </h2>
            <p className={styles.tripText}>
              Morning: Arrive in Karuizawa and check into Guesthouse Tomo, which
              is a 10-minute walk from the city center.<br></br> <br></br>
              Afternoon: Explore the historic Kyu-Karuizawa Ginza Street for
              shopping and local snacks.<br></br> <br></br>
              Evening: Enjoy dinner at Yamanami Tei, a local Japanese restaurant
              known for its authentic cuisine and budget-friendly options.
            </p>
          </div>
        </div>
        <div className={styles.dayCard}>
          <Image
            className={styles.img}
            src="/images/day2-img.png"
            alt="trip thumbnail"
            width={223}
            height={243}
          />
          <div className={styles.textContainer}>
            <h2 className={styles.tripHeader}>Day 2: Nature & Relaxation</h2>
            <p className={styles.tripText}>
              Morning: Visit Shiraito Falls for a serene nature experience.
              <br></br>
              <br></br>
              Afternoon: Have lunch at Kazahana Cafe, a charming local cafe with
              a delightful atmosphere. <br></br>
              <br></br>
              Evening: Relax at Hoshino Onsen, one of the local hot springs
              known for its tranquil ambiance.
            </p>
          </div>
        </div>
        <div className={styles.dayCard}>
          <Image
            className={styles.img}
            src="/images/day3-img.png"
            alt="trip thumbnail"
            width={223}
            height={243}
          />
          <div className={styles.textContainer}>
            <h2 className={styles.tripHeader}>Day 3: Outdoor Adventure</h2>
            <p className={styles.tripText}>
              Morning: Take a hike in the scenic Usui Pass with picturesque
              views.<br></br> <br></br>Afternoon: Enjoy a picnic with local
              delicacies from Pantry Harunire, a local market offering fresh and
              regional products.<br></br> <br></br>
              Evening: Have dinner at Yakiniku Hiro, a recommended Japanese
              barbecue restaurant.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
