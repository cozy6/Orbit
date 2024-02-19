import Image from "next/image";
import styles from "@/styles/onboarding.module.css";
import Link from "next/link";

//Components
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Onboarding() {
  return (
    <main className={styles.main}>
      <div className={`${styles.mainContainer} ${styles.background}`}>
        <div className={styles.heading}>
          <p>Orbit.</p>
        </div>
        <div className={styles.surveyContainer}>
          <div className={styles.content}>
            <div className={styles.description}>
              <p className={styles.stage}>Step 2: Travel & Timeline</p>
              <div className={styles.progressBar}>
                <div className={styles.currentStep}></div>
                <div className={styles.currentStep}></div>
                <div className={styles.step}></div>
                <div className={styles.step}></div>
              </div>
            </div>
            <p className={styles.question_o2}>How are you planning to Travel?</p>
            <p style={{ fontFamily: "var(--body-font)", color: "var(--dark-blue)" }}>Travel Type</p>
            <div style={{ display: "flex", marginTop: "1em" }}>
              <button
                style={{
                  backgroundColor: "#413EEA",
                  padding: "12px 78px",
                  borderRadius: "10px",
                  fontFamily: "var(--body-font)",
                  fontSize: "var(--tablet-body-12pt)",
                }}>
                Roundtrip
              </button>
              <button
                style={{
                  backgroundColor: "#27117B",
                  padding: "12px 78px",
                  borderRadius: "10px",
                  fontFamily: "var(--body-font)",
                  fontSize: "var(--tablet-body-12pt)",
                }}>
                One way
              </button>
            </div>
            <p style={{ fontFamily: "var(--body-font)", color: "var(--dark-blue)", marginTop: "1em" }}>Select Dates</p>
            <div style={{ color: "#000", marginTop: "2em", marginLeft: "2em" }}>
              <Calendar />
            </div>
          </div>
          <div className={styles.graphic}>
            <Image src={"/images/graphics/onboarding-2-graphic.svg"} height={854} width={642} alt="location graphic" />
            <Link href="/onboarding_3">
              <button className={styles.button}>Next</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
