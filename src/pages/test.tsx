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

  const [foodBudget, setFoodBudget] = useState("");
  const [accommodationBudget, setAccommodationBudget] = useState("");
  const [activitiesBudget, setActivitiesBudget] = useState("");
  const [transportBudget, setTransportBudget] = useState("");

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
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    const userMessage: UserMessage = {
      role: "assistant",
      content: `I'm planning a trip from ${departureCity} to ${arrivingCity} for ${numTravelers} travelers. The trip duration is ${selectedDate?.toLocaleDateString()} and the budget is ${activitiesBudget}, ${foodBudget}, ${accommodationBudget}, ${transportBudget}. ${getawayDescription}. Can you suggest an itinerary for me?`,
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
      nextPage();
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
    ? destinations.filter((city) => city.toLowerCase().includes(searchDeparture.toLowerCase()))
    : destinations;

  const filteredArrivals = searchArriving
    ? destinations.filter((city) => city.toLowerCase().includes(searchArriving.toLowerCase()))
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
                          <p className={styles.progress_title}>Step 1: Location</p>
                          <Image
                            className={styles.progress_bar}
                            src={"/images/progress-1.svg"}
                            alt={"progress-bar"}
                            width={307}
                            height={4}
                          />
                        </div>
                        <h1 className={styles.steps_title}>Where does your heart long to be?</h1>
                      </div>
                      <div className={styles.input_container}>
                        <label className={styles.label_text}>
                          <div className={styles.label_headername}>Departure City:</div>
                          <select
                            className={styles.placeholder_text}
                            value={departureCity}
                            onChange={(e) => setDepartureCity(e.target.value)}>
                            <option value="">Select Departure City</option>
                            {filteredDepartures.map((city, index) => (
                              <option key={index} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className={styles.label_text}>
                          <div className={styles.label_headername}>Arriving City:</div>
                          <select
                            className={styles.placeholder_text}
                            value={arrivingCity}
                            onChange={(e) => setArrivingCity(e.target.value)}>
                            <option value="">Select Arriving City</option>
                            {filteredArrivals.map((city, index) => (
                              <option key={index} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className={styles.label_text_2}>
                          <div className={styles.label_headername}>Number of Travelers:</div>
                          <input
                            className={styles.number_text}
                            type="number"
                            value={numTravelers}
                            onChange={(e) => setNumTravelers(parseInt(e.target.value))}
                            required
                          />
                          <div className={styles.increment_decrement}>
                            <button className={styles.decrement_button} type="button">
                              -
                            </button>
                            <button className={styles.increment_button} type="button">
                              +
                            </button>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className={styles.graphic}>
                      <Image
                        className={styles.location_graphic}
                        src={"/images/graphics/location-graphic.svg"}
                        alt={"location-graphic"}
                        height={854}
                        width={642}
                      />
                    </div>
                    <div className={styles.graphic2}>
                      <Image
                        className={styles.location_graphic_tablet}
                        src={"/images/graphics/location-graphic-tablet.svg"}
                        alt={"location-graphic"}
                        height={433}
                        width={715}
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
                          <p className={styles.progress_title}>Step 2: Travel & Time</p>
                          <Image
                            className={styles.progress_bar}
                            src={"/images/progress-2.svg"}
                            alt={"progress-bar"}
                            width={307}
                            height={4}
                          />
                        </div>
                        <h1 className={styles.steps_title}>How are you planning to travel?</h1>
                      </div>
                      <div className={styles.input_container_date}>
                        <label className={styles.label_text}>Select Dates:</label>
                        <div className="date_picker_container">
                          <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="dd/MM/yyyy"
                            inline
                          />
                          <p>{selectedDate && `Selected for ${calculateTripDuration()} days`}</p>
                        </div>
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
                    <div className={styles.graphic2}>
                      <Image
                        className={styles.location_graphic_tablet}
                        src={"/images/graphics/location-graphic-tablet-2.svg"}
                        alt={"location-graphic"}
                        height={433}
                        width={715}
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
                          <p className={styles.progress_title}>Step 3: Budget</p>
                          <Image
                            className={styles.progress_bar}
                            src={"/images/progress-3.svg"}
                            alt={"progress-bar"}
                            width={307}
                            height={4}
                          />
                        </div>
                        <h1 className={styles.steps_title}>What’s your budgeting goal? </h1>
                      </div>
                      <div className={styles.budget_form_container}>
                        <label className={styles.without_budget}>
                          <p>I don't have any budget goals</p>
                          <input type="checkbox" id="checkBudget" />
                        </label>
                        <h2 className={styles.form_title}>My budgeting preferences:</h2>
                        <div className={styles.with_budget} id="budgetForm">
                          <label className={styles.budget_input}>
                            <div>Transportation Budget:</div>
                            <input
                              placeholder=".00"
                              type="text"
                              value={transportBudget}
                              onChange={(e) => setTransportBudget(e.target.value)}
                              required
                            />
                          </label>
                          <label className={styles.budget_input}>
                            <div>Food Budget:</div>
                            <input
                              placeholder=".00"
                              type="text"
                              value={foodBudget}
                              onChange={(e) => setFoodBudget(e.target.value)}
                              required
                            />
                          </label>
                          <label className={styles.budget_input}>
                            <div>Accommodation Budget:</div>
                            <input
                              placeholder=".00"
                              type="text"
                              value={accommodationBudget}
                              onChange={(e) => setAccommodationBudget(e.target.value)}
                              required
                            />
                          </label>
                          <label className={styles.budget_input}>
                            <div>Activities Budget:</div>
                            <input
                              placeholder=".00"
                              type="text"
                              value={activitiesBudget}
                              onChange={(e) => setActivitiesBudget(e.target.value)}
                              required
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className={styles.graphic}>
                      <Image
                        src={"/images/graphics/location-graphic-3.svg"}
                        alt={"location-graphic"}
                        height={854}
                        width={642}
                      />
                    </div>
                    <div className={styles.graphic2}>
                      <Image
                        className={styles.location_graphic_tablet}
                        src={"/images/graphics/location-graphic-tablet-3.svg"}
                        alt={"location-graphic"}
                        height={433}
                        width={715}
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
                          What's your ideal plan for a <br></br>memorable voyage?
                        </h1>
                        <h1 className={styles.steps_title2}>What's your ideal plan for a memorable voyage?</h1>
                      </div>
                      <label className={styles.label_text}>
                        <p>Describe your perfect getaway location:</p>
                        <textarea
                          className={styles.getaway_placeholder_text}
                          placeholder="E.g “Backpack adventures”, “Culture & traditions”, “Family vacation”..."
                          value={getawayDescription}
                          onChange={(e) => setGetawayDescription(e.target.value)}
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
                    <div className={styles.graphic2}>
                      <Image
                        className={styles.location_graphic_tablet}
                        src={"/images/graphics/location-graphic-tablet-4.svg"}
                        alt={"location-graphic"}
                        height={433}
                        width={715}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {page === 5 && (
              <>
                <div className={styles.wrapper}>
                  <div className={styles.header}>
                    <Image src={"/images/banner.png"} alt={"banner-graphic"} height={220} width={1320} />
                    <div className={styles.left_column}>
                      {loading && <p>Loading...</p>}
                      {generatedItinerary && (
                        <div className={styles.generated_itinerary}>
                          <h2>Generated Itinerary</h2>
                          <p>{generatedItinerary}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.button_container}>
                  <Link href="/">
                    <button type="button" className={styles.button2}>
                      Back to home
                    </button>
                  </Link>
                </div>
              </>
            )}

            {page !== 5 && (
              <div className={styles.button_container}>
                {page === 1 && (
                  <Link href={"/"} className={styles.button1}>
                    <Image src={"/images/back.svg"} alt={"back-button"} height={17} width={18} />
                    Back
                  </Link>
                )}
                {page > 1 && page < 5 && (
                  <button type="button" onClick={prevPage} className={styles.button1}>
                    <Image src={"/images/back.svg"} alt={"back-button"} height={17} width={18} />
                    Previous
                  </button>
                )}
                {page < 4 ? (
                  <button type="button" onClick={nextPage} className={styles.button2}>
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
            )}
          </div>
        </form>
      </main>
    </>
  );
}
