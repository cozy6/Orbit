import Image  from 'next/image'
import styles from '@/styles/onboarding.module.css'
import Link from 'next/link';
import { useState } from 'react';


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
                    <p className={styles.stage}>Step 4: Ideal plan</p>
                    <div className={styles.progressBar}>
                        <div className={styles.currentStep}></div>
                        <div className={styles.currentStep}></div>
                        <div className={styles.currentStep}></div>
                        <div className={styles.currentStep}></div>
                    </div>
                </div>
                <p className={styles.question}>What's your ideal plan for a memorable voyage?</p>
                <div className={styles.plan_question}>
                    <p>Describe your perfect getaway</p>
                    <input type="text" placeholder="E.g “Backpack adventures”, “Culture & traditions”, “Family vacation”..."/>
                </div>
                <div className={styles.plan_container}>
                <button className={styles.plan_button}>
                    <p>Family vacation</p>
                    <div></div>
                </button>
                <button className={styles.plan_button}>
                    <p>Active recreation</p>
                    <div></div>
                </button>
                <button className={styles.plan_button}>
                    <p>Culinary Tour</p>
                    <div></div>
                </button>
                <button className={styles.plan_button}>
                    <p>Culture & traditions</p>
                    <div></div>
                </button>
                <button className={styles.plan_button}>
                    <p>Backpacking adventures</p>
                    <div></div>
                </button>
                </div>
            </div>
            <div className={styles.graphic}>
                <Image
                    src={"/images/graphics/location-graphic-3.svg"}
                    height={854}
                    width={642}
                    alt="location graphic"
                />
                <Link href="/onborading_4">
                    <button className={styles.button}>Submit</button>
                </Link>
            </div>
        </div>
      </div>
    </main>
  )
}
