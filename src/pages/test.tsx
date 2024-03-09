import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/test.module.css";
import { UserMessage } from "../typings.d";

const destinations = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "Paris",
  "London",
  "Tokyo",
  "Vancouver",
];

export default function Test() {
  const [page, setPage] = useState(1);
  const [departureCity, setDepartureCity] = useState("");
  const [arrivingCity, setArrivingCity] = useState("");
  const [numTravelers, setNumTravelers] = useState(1);
  const [tripDuration, setTripDuration] = useState<number | null>(null);
  const [tripBudget, setTripBudget] = useState("");
  const [getawayDescription, setGetawayDescription] = useState("");
  const [generatedItinerary, setGeneratedItinerary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchDeparture, setSearchDeparture] = useState("");
  const [searchArriving, setSearchArriving] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (page === 4) {
      setLoading(true);
      await generateItinerary();
      setLoading(false);
    } else {
      nextPage();
    }
  };

  const generateItinerary = async () => {
    const apiEndpoint = "https://api.openai.com/v1/chat/completions";
    const apiKey = process.env.NEXT_OPENAI_API_KEY;

    const userMessage: UserMessage = {
      role: "assistant",
      content: `I'm planning a trip from ${departureCity} to ${arrivingCity} for ${numTravelers} travelers. The trip duration is ${selectedDate?.toLocaleDateString()} and the budget is ${tripBudget}. ${getawayDescription}. Can you suggest an itinerary for me?`,
    };

    try {
      const response = await axios.post(
        apiEndpoint,
        {
          model: "gpt-3.5-turbo",
          messages: [userMessage],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);
      const generatedText = response.data.choices[0].message.content;
      setGeneratedItinerary(generatedText);
      setError("");
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to generate itinerary. Please try again.");
    }
  };

  const calculateTripDuration = () => {
    if (selectedDate) {
      const today = new Date();
      const differenceInTime = selectedDate.getTime() - today.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      return Math.round(differenceInDays);
    }
    return null;
  };

  const filteredDepartures = searchDeparture
    ? destinations.filter((city) =>
        city.toLowerCase().includes(searchDeparture.toLowerCase())
      )
    : destinations;

  const filteredArrivals = searchArriving
    ? destinations.filter((city) =>
        city.toLowerCase().includes(searchArriving.toLowerCase())
      )
    : destinations;

  return (
    <>
      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <div className={styles.page_content}>
            <div className={styles.page_1}>
              {page === 1 && (
                <>
                  <div className={styles.wrapper}>
                    <div className={styles.left_column}>
                      <div className={styles.header_container}>
                        <div className={styles.progress_container}>
                          <p className={styles.progress_title}>
                            Step 1: Location
                          </p>
                          <Image
                            className={styles.progress_bar}
                            src={"/images/progress-1.svg"}
                            alt={"progress-bar"}
                            width={307}
                            height={4}
                          />
                        </div>
                        <h1 className={styles.steps_title}>
                          Where does your heart long to be?
                        </h1>
                      </div>
                      <div className={styles.input_container}>
                        <label className={styles.label_text}>
                          Departure City:
                          <input
                            className={styles.placeholder_text}
                            type="text"
                            value={searchDeparture}
                            onChange={(e) => {
                              setSearchDeparture(e.target.value);
                              setDepartureCity(e.target.value);
                            }}
                            placeholder="Search or select departure city"
                          />
                          <select
                            className={styles.placeholder_text}
                            value={departureCity}
                            onChange={(e) => setDepartureCity(e.target.value)}
                          >
                            <option value="">Select Departure City</option>
                            {filteredDepartures.map((city, index) => (
                              <option key={index} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className={styles.label_text}>
                          Arriving City:
                          <input
                            className={styles.placeholder_text}
                            type="text"
                            value={searchArriving}
                            onChange={(e) => {
                              setSearchArriving(e.target.value);
                              setArrivingCity(e.target.value);
                            }}
                            placeholder="Search or select arriving city"
                          />
                          <select
                            className={styles.placeholder_text}
                            value={arrivingCity}
                            onChange={(e) => setArrivingCity(e.target.value)}
                          >
                            <option value="">Select Arriving City</option>
                            {filteredArrivals.map((city, index) => (
                              <option key={index} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className={styles.label_text}>
                          Number of Travelers:
                          <input
                            className={styles.placeholder_text}
                            type="number"
                            value={numTravelers}
                            onChange={(e) =>
                              setNumTravelers(parseInt(e.target.value))
                            }
                            required
                          />
                        </label>
                      </div>
                    </div>
                    <div className={styles.graphic}>
                      <Image
                        src={"/images/graphics/location-graphic.svg"}
                        alt={"location-graphic"}
                        height={854}
                        width={642}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className={styles.page_2}>
              {page === 2 && (
                <>
                  <div className={styles.wrapper}>
                    <div className={styles.left_column}>
                      <div className={styles.header_container}>
                        <div className={styles.progress_container}>
                          <p className={styles.progress_title}>
                            Step 2: Travel & Time
                          </p>
                          <Image
                            className={styles.progress_bar}
                            src={"/images/progress-2.svg"}
                            alt={"progress-bar"}
                            width={307}
                            height={4}
                          />
                        </div>
                        <h1 className={styles.steps_title}>
                          How are you planning to travel?
                        </h1>
                      </div>
                      <div className={styles.input_container_date}>
                        <label>
                          Trip Duration:
                          <div className="date_picker_container">
                            <DatePicker
                              selected={selectedDate}
                              onChange={(date) => setSelectedDate(date)}
                              dateFormat="dd/MM/yyyy"
                              inline
                            />
                            <p>
                              {selectedDate &&
                                `Selected for ${calculateTripDuration()} days`}
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className={styles.graphic}>
                      <Image
                        src={"/images/graphics/onboarding-2-graphic.svg"}
                        alt={"location-graphic"}
                        height={854}
                        width={642}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className={styles.page_3}>
              {page === 3 && (
                <>
                  <div className={styles.wrapper}>
                    <div className={styles.left_column}>
                      <div className={styles.header_container}>
                        <div className={styles.progress_container}>
                          <p className={styles.progress_title}>
                            Step 3: Budget
                          </p>
                          <Image
                            className={styles.progress_bar}
                            src={"/images/progress-3.svg"}
                            alt={"progress-bar"}
                            width={307}
                            height={4}
                          />
                        </div>
                        <h1 className={styles.steps_title}>
                          What’s your budgeting goal?{" "}
                        </h1>
                      </div>
                      <label>
                        Trip Budget:
                        <input
                          type="text"
                          value={tripBudget}
                          onChange={(e) => setTripBudget(e.target.value)}
                          required
                        />
                      </label>
                    </div>
                    <div className={styles.graphic}>
                      <Image
                        src={"/images/graphics/location-graphic-3.svg"}
                        alt={"location-graphic"}
                        height={854}
                        width={642}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className={styles.page_4}>
              {page === 4 && (
                <>
                  <div className={styles.wrapper}>
                    <div className={styles.left_column}>
                      <div className={styles.header_container}>
                        <div className={styles.progress_container}>
                          <p className={styles.progress_title}>Step 4:</p>
                          <Image
                            className={styles.progress_bar}
                            src={"/images/progress-4.svg"}
                            alt={"progress-bar"}
                            width={307}
                            height={4}
                          />
                        </div>
                        <h1 className={styles.steps_title}>
                          What's your ideal plan for a <br></br>memorable
                          voyage?
                        </h1>
                      </div>
                      <label>
                        Describe your perfect getaway location:
                        <textarea
                          value={getawayDescription}
                          onChange={(e) =>
                            setGetawayDescription(e.target.value)
                          }
                          required
                        />
                      </label>
                    </div>
                    <div className={styles.graphic}>
                      <Image
                        src={"/images/graphics/location-graphic-4.svg"}
                        alt={"location-graphic"}
                        height={854}
                        width={642}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className={styles.button_container}>
              {page === 1 && (
                <Link href={"/"} className={styles.button1}>
                  <Image
                    src={"/images/back.svg"}
                    alt={"location-graphic"}
                    height={17}
                    width={18}
                  />
                  Back
                </Link>
              )}
              {page > 1 && (
                <button
                  type="button"
                  onClick={prevPage}
                  className={styles.button1}
                >
                  <Image
                    src={"/images/back.svg"}
                    alt={"location-graphic"}
                    height={17}
                    width={18}
                  />
                  Previous
                </button>
              )}
              {page < 4 ? (
                <button
                  type="button"
                  onClick={nextPage}
                  className={styles.button2}
                >
                  Submit
                </button>
              ) : loading ? (
                <button type="button" disabled className={styles.button}>
                  Generating...
                </button>
              ) : (
                <button type="submit" className={styles.button2}>
                  Generate Itinerary
                </button>
              )}
            </div>
          </div>
        </form>
        {loading && <p>Loading...</p>}
        {generatedItinerary && (
          <div className={styles.generated_itinerary}>
            <h2>Generated Itinerary</h2>
            <p>{generatedItinerary}</p>
          </div>
        )}
      </main>
    </>
  );
}
