import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.heading}>
          <p>Orbit.</p>
        </div>
        <div className={styles.content}>
          <p className={styles.header}>Orbit into Adventure</p>
          <p className={styles.subHeader}>Discover personalized travel plans effortlessly with us.</p>
          <button type='button' className={styles.button}>
            <Link href="/test">
              Let's Go
            </Link>
            </button>
        </div>
      </div>
    </main>
  )
}
