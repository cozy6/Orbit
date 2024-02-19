import Image  from 'next/image'
import styles from '@/styles/results.module.css'
import Link from 'next/link';
import { useState } from 'react';


export default function Results() {


  return (
    <main className={`${styles.mainContainer} ${styles.background}`}>
        <div className={styles.heading}>
            <p>Orbit.</p>
        </div>
        <div className={styles.loading}>
            <div className={styles.loadingAnimation}></div>
            Please wait while we plan the best trip for you!
        </div>
        <div className={styles.dataResults}>

        </div>
    </main>
  )
}
