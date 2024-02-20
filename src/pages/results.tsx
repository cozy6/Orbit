import Image from "next/image";
import styles from "@/styles/results.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

//components
import Itinerary from "@/components/Itinerary";
import TripExpense from "@/components/TripExpense";

export default function Results() {
  const [loadingCount, setLoadingCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loadingCount < 5) {
        setLoadingCount(loadingCount + 1);
      }
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [loadingCount]);

  return (
    <main className={`${styles.mainContainer} ${styles.background}`}>
      <div className={styles.heading}>
        <p>Orbit.</p>
      </div>
      {loadingCount < 5 ? (
        <div className={styles.loading}>
          <div className={styles.loadingAnimation}></div>
          Please wait while we plan the best trip for you!
        </div>
      ) : (
        <section className={styles.dataResults}>
          <div className={styles.banner}>
            <div className={styles.headerContainer}>
              <h1
                className={styles.bannerHeader}
                style={{
                  fontFamily: "var(--heading-font)",
                  fontSize: "var(--desktop-heading1)",
                  color: "var(--black)",
                }}
              >
                Hello, Jimin!
              </h1>
              <p
                className={styles.bannerSubheader}
                style={{
                  fontFamily: "var(--body-font)",
                  fontSize: "var(--desktop-body-20pt)",
                  color: "var(--black)",
                }}
              >
                Explore the plans that await you
              </p>
            </div>
          </div>
          <div className={styles.itineraryContainers}>
            <div className={styles.leftColumn}>
              <Itinerary />
            </div>
            <div className={styles.rightColumn}>
              <div className={styles.links}>
                <Link
                  className={styles.regenerate}
                  style={{ display: "flex", flexDirection: "row", gap: ".5em" }}
                  href="/"
                >
                  <Image
                    src="/images/zap.svg"
                    alt="regenerate icon"
                    width={16}
                    height={16}
                  />
                  <p
                    style={{
                      fontFamily: "var(--body-font)",
                      fontSize: "var(--desktop-body-16pt)",
                      color: "var(--dark-blue)",
                    }}
                  >
                    Regenerate
                  </p>
                </Link>
                <div className={styles.buttonContainer}>
                  <Link href="/dashboard" className={styles.buttonPrimary}>
                    Save to Dashboard
                  </Link>
                  <Link href="/" className={styles.buttonSecondary}>
                    Create another trip
                  </Link>
                </div>
              </div>
              <TripExpense/>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
