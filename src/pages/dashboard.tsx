import Image from "next/image";
import styles from "@/styles/dashboard.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchWeather } from "../components/weather";
import { WeatherStats } from "../typings.d";

export default function Dashboard() {
  const [weather, setWeather] = useState<WeatherStats | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchWeather("Vancouver");
      console.log("Weather data:", data);
      setWeather(data);
    }
    fetchData();
  }, []);

  console.log("Weather state:", weather);

  return (
    <main className={`${styles.mainContainer} ${styles.background}`}>
      <div className={styles.heading}>
        <p>Orbit.</p>
      </div>
      <section className={styles.dataResults}>
        <div className={styles.banner}>
          {weather && (
            <div style={{ display:"flex", flexDirection:"column", marginLeft:"2em", marginTop:"1em" }}>
              <h2 style={{ fontSize:"var(--desktop-bold-header)", fontFamily:"var(--body-font)", color:"var(--blue)" }}>{weather.name}</h2>
              <p style={{ color:"var(--blue)" }}>Temperature: {weather.main.temp}°C</p>
              <p style={{ color:"var(--blue)" }}>Weather: {weather.weather[0].description}</p>
            </div>
          )}
        </div>
        <div className={styles.itineraryContainers}>
          <div className={styles.leftColumn}>
            <h1
              style={{ fontFamily: "var(--heading-font)", color: "var(--black)", fontSize: "var(--desktop-heading3)" }}>
              Let's Explore, Jimin{" "}
            </h1>
            <Image src={"/images/graphics/expense-tracker.png"} alt={"budget tracker"} width={450} height={265} />
            <Link href="/">
              <button className={styles.itinerary_button}>Make a new itinerary</button>
            </Link>
          </div>
          <div className={styles.rightColumn}>
            <div>
              <h2 style={{ fontFamily: "var(--heading-font)", color: "var(--black)" }}>Recommendations</h2>
              <div className={styles.recommendation_container}>
                <Image src={"/images/graphics/recommendation-card-1.png"} alt={"rec-1"} width={358} height={138} />
                <Image src={"/images/graphics/recommendation-card-2.png"} alt={"rec-2"} width={358} height={138} />
              </div>
            </div>

            <div>
              <h2 style={{ fontFamily: "var(--heading-font)", color: "var(--black)" }}>Saved Plans</h2>
              <div className={styles.saved_container}>
                <Image src={"/images/graphics/saved-plan-1.png"} alt={"save-1"} width={206} height={148} />
                <Image src={"/images/graphics/saved-plan-2.png"} alt={"save-2"} width={206} height={148} />
                <Image src={"/images/graphics/saved-plan-3.png"} alt={"save-3"} width={206} height={148} />
                <Image src={"/images/graphics/saved-plan-4.png"} alt={"save-4"} width={206} height={148} />
              </div>
            </div>

            <div>
              <h2 style={{ fontFamily: "var(--heading-font)", color: "var(--black)" }}>Globetrotter Insights</h2>
              <p style={{ fontFamily: "var(--body-font)", color: "var(--black)", fontSize: "var(--tablet-body-12pt)" }}>
                Check out reviews through sharded experiences
              </p>
              <div className={styles.trotter_container}>
                <Image src={"/images/graphics/globe-1.png"} alt={"globe-1"} width={313} height={135} />
                <Image src={"/images/graphics/globe-2.png"} alt={"globe-2"} width={313} height={135} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
