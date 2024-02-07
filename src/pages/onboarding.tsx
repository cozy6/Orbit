import Image  from 'next/image'
import styles from '@/styles/onboarding.module.css'
import { useState } from 'react';

export default function Onboarding() {

    const [counterAmount, setCounterAmount] = useState(1);

  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.heading}>
            <p>Orbit.</p>
        </div>
        <div className={styles.surveyContainer}>
            <div className={styles.content}>
                <div className={styles.description}>
                    <p className={styles.stage}>Step 1: Location</p>
                    <div className={styles.progressBar}>
                        <div className={styles.currentStep}></div>
                        <div className={styles.step}></div>
                        <div className={styles.step}></div>
                        <div className={styles.step}></div>
                    </div>
                </div>
                <p className={styles.question}>Where does your heart long to be?</p>
                <div className="dropdown">
                    <label className={styles.select}>Departure City</label>
                    <form action="#" className={styles.form}>
                        <select name="languages" id="lang">
                            <option value="select">Where are you from?</option>
                            <option value="YVR" className={styles.options}>Vancouver International Airport (YVR) </option>
                            <option value="YUL" className={styles.options}>Montréal International Airport (YUL)</option>
                            <option value="YYC" className={styles.options}>Calgary International Airport (YYC)</option>
                            <option value="YHZ" className={styles.options}>Halifax  International Airport (YHZ)</option>
                            <option value="YEG" className={styles.options}>Edmonton International Airport (YEG)</option>
                        </select>
                    </form>
                    <input type="submit" value="Submit" />
                </div>
                <div className="dropdown">
                    <label className={styles.select}>Arriving City</label>
                    <form action="#" className={styles.form}>
                        <select name="languages" id="lang">
                            <option value="select">Where do you want to go?</option>
                            <option value="YVR" className={styles.options}>Vancouver International Airport (YVR) </option>
                            <option value="YUL" className={styles.options}>Montréal International Airport (YUL)</option>
                            <option value="YYC" className={styles.options}>Calgary International Airport (YYC)</option>
                            <option value="YHZ" className={styles.options}>Halifax  International Airport (YHZ)</option>
                            <option value="YEG" className={styles.options}>Edmonton International Airport (YEG)</option>
                        </select>
                    </form>
                    <input type="submit" value="Submit" />
                </div>
                <label className={styles.select}>Number of Travellers</label>
                <div className={styles.traveller}>
                    <p className={styles.counter}>{counterAmount}</p>
                    <div className={styles.buttons}>
                        <button className={styles.addMinus} onClick={() => setCounterAmount(Math.max(counterAmount - 1, 1))}> 
                            -
                        </button>
                        <p>|</p>
                        <button className={styles.addMinus} onClick={() => setCounterAmount(counterAmount + 1)}>
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.graphic}>
                <Image
                    src={"/images/graphics/location-graphic.svg"}
                    height={854}
                    width={642}
                    alt="location graphic"
                    />
            </div>
        </div>
      </div>
    </main>
  )
}
