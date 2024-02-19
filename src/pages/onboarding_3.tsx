import Image  from 'next/image'
import styles from '@/styles/results.module.css'
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
                    <p className={styles.stage}>Step 3: Budget</p>
                    <div className={styles.progressBar}>
                        <div className={styles.currentStep}></div>
                        <div className={styles.currentStep}></div>
                        <div className={styles.currentStep}></div>
                        <div className={styles.step}></div>
                    </div>
                </div>
                <p className={styles.question}>What's your budgeting goal?</p>
                <button className={styles.noBudget_button}>
                    <p>I don't have any budgeting goals </p>
                    <div></div>
                </button>
                <div>
                    <p className={styles.preferences_question}>My budgeting preferences:</p>
                    <div className={styles.preferences_container}>
                        <div className={styles.preferences_select}>
                            <div>
                                <p>Transport budget</p>
                                <input type="number" placeholder=".00"/>
                            </div>
                            <div>
                                <p>Activities budget</p>
                                <input type="number" placeholder=".00"/>
                            </div>
                        </div>
                        <div className={styles.preferences_select}>
                            <div>
                                <p>Accommodation budget</p>
                                <input type="number" placeholder=".00"/>
                            </div>
                            <div>
                                <p>Food budget</p>
                                <input type="number" placeholder=".00"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.graphic}>
                <Image
                    src={"/images/graphics/location-graphic-3.svg"}
                    height={854}
                    width={642}
                    alt="location graphic"
                />
                <Link href="/onboarding_4">
                    <button className={styles.button}>Next</button>
                </Link>
            </div>
        </div>
      </div>
    </main>
  )
}
