import Image  from 'next/image'
import styles from '@/styles/onboarding.module.css'
import Link from 'next/link';
import { use, useState } from 'react';
import airport from "../data/airport.json"


export default function Onboarding() {
    
    const [amount, setAmount] = useState(1);
    const [data,setData] = useState(airport).sort();
    
    const datas = airport.sort();

    const [depart, setDepart] = useState("Departing City");
    const [arrive, setArrive] = useState("Arriving City");
    // const [airportChanged, setAirportChanged] = useState([])

    // Changing the departing city

    const changeDepart = (event) => {
        setDepart(event.target.value);
    }

    // Changing the arriving city

    const changeArrive = (event) => {
        setArrive(event.target.value);
    }

  return (
    <main className={styles.main}>
      <div className={`${styles.mainContainer} ${styles.background}`}>
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
                    <label className={styles.select}>Departing City</label>
                    <form action="#" className={styles.form}>
                        <search></search>
                        <select name="languages" id="lang" value={depart} onChange={changeDepart} >
                           <option value="select">Where are you from?</option>
                            {
                                airport.map((city) => (
                                    <option>{city.name} ({city.iata})</option>
                                ))
                            }
                        </select>
                    </form>
                </div>
                <br></br>
                <div className="dropdown">
                    <label className={styles.select}>Arriving City</label>
                    <form action="#" className={styles.form}>
                        <select name="languages" id="lang" value={arrive} onChange={changeArrive} >
                            <option value="select">Where do you want to go?</option>
                            {
                                airport.map((city) => (
                                    <option>{city.name} ({city.iata})</option>
                                ))
                            }
                        </select>
                    </form>
                </div>
                <br></br>
                <label className={styles.select}>Number of Travellers</label>
                <div className={styles.traveller}>
                    <p className={styles.counter}>{amount}</p>
                    <div className={styles.buttons}>
                        <button className={styles.addMinus}onClick={() => setAmount(Math.max(amount - 1, 1))}> 
                            -
                        </button>
                        <p>|</p>
                        <button className={styles.addMinus} onClick={() => setAmount(amount + 1)}>
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
                <Link href="/onboarding_2">
                    <button className={styles.button}>Next</button>
                </Link>
            </div>
        </div>
      </div>
    </main>
  )
}
