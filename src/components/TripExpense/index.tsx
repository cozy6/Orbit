import styles from "@/components/TripExpense/TripExpense.module.css";
import Image from "next/image";

export default function TripExpense() {
  return (
    <main className={`${styles.mainContainer} ${styles.background}`}>
      <h1
        style={{
          fontFamily: "var(--heading-font)",
          fontSize: "var(--desktop-body-18pt)",
          color: "var(--dark-blue)",
        }}
      >
        Trip Expense Overview
      </h1>
      <section className={styles.tripExpenses}>
        <div className={styles.tripExpensesBreakdown}>
          <div className={styles.budget}>
            <Image
              src="/images/food-icon.svg"
              alt="icon"
              width={24}
              height={24}
            />
            <p>Food</p>
            <p>$200</p>
          </div>
          <div className={styles.budget}>
            <Image
              src="/images/transport-icon.svg"
              alt="icon"
              width={24}
              height={24}
            />
            <p>Transport</p>
            <p>$100</p>
          </div>
          <div className={styles.budget}>
            <Image
              src="/images/activities-icon.svg"
              alt="icon"
              width={24}
              height={24}
            />
            <p>Activities</p>
            <p>$1,500</p>
          </div>
          <div className={styles.budget}>
            <Image
              src="/images/accommodations-icon.svg"
              alt="icon"
              width={24}
              height={24}
            />
            <p>Accommodations</p>
            <p>$1,800</p>
          </div>
        </div>
        <div className={styles.tripGraph}>
          <Image
            src="/images/graph.png"
            alt="budget graph"
            width={152}
            height={152}
          />
        </div>
      </section>
      <section className={styles.review}>
        <h1
          style={{
            fontFamily: "var(--heading-font)",
            fontSize: "var(--desktop-body-18pt)",
            color: "var(--dark-blue)",
          }}
        >
          Reviews
        </h1>
        <div className={styles.reviewScrollGroup}>
          <div className={styles.reviewCards}>
            <div className={styles.reviewtextContainer}>
              <h3 className={styles.reviewHeader}>Kumoda Pond</h3>
              <p className={styles.reviewText}>Karuizawa, Japan</p>
            </div>
            <Image
              src="/images/review-img1.png"
              alt="review image"
              width={232}
              height={132}
            />
          </div>
          <div className={styles.reviewCards}>
            <div className={styles.reviewtextContainer}>
              <h3 className={styles.reviewHeader}>Kusatsu Onsen</h3>
              <p className={styles.reviewText}>Karuizawa, Japan</p>
            </div>
            <Image
              src="/images/review-img2.png"
              alt="review image"
              width={232}
              height={132}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
