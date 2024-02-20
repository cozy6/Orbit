import React, { useState } from "react";
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
    ? destinations.filter((city) => city.toLowerCase().includes(searchDeparture.toLowerCase()))
    : destinations;

  const filteredArrivals = searchArriving
    ? destinations.filter((city) => city.toLowerCase().includes(searchArriving.toLowerCase()))
    : destinations;

  return (
    <>
    <main className={styles.main}>
      <div>
        <h1>Itinerary Builder</h1>
        <form onSubmit={handleSubmit}>
          {page === 1 && (
            <>
              <label>
                Departure City:
                <input
                  type="text"
                  value={searchDeparture}
                  onChange={(e) => {
                    setSearchDeparture(e.target.value);
                    setDepartureCity(e.target.value);
                  }}
                  placeholder="Search or select departure city"
                />
                <select value={departureCity} onChange={(e) => setDepartureCity(e.target.value)}>
                  <option value="">Select Departure City</option>
                  {filteredDepartures.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Arriving City:
                <input
                  type="text"
                  value={searchArriving}
                  onChange={(e) => {
                    setSearchArriving(e.target.value);
                    setArrivingCity(e.target.value);
                  }}
                  placeholder="Search or select arriving city"
                />
                <select value={arrivingCity} onChange={(e) => setArrivingCity(e.target.value)}>
                  <option value="">Select Arriving City</option>
                  {filteredArrivals.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Number of Travelers:
                <input
                  type="number"
                  value={numTravelers}
                  onChange={(e) => setNumTravelers(parseInt(e.target.value))}
                  required
                />
              </label>
            </>
          )}

          <div className={styles.onboarding_2}>
            {page === 2 && (
              <>
                <label>
                  Trip Duration:
                  <div className="date_picker_container">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd/MM/yyyy"
                      inline
                    />
                    <p>{selectedDate && `Selected for ${calculateTripDuration()} days`}</p>
                  </div>
                </label>
              </>
            )}
          </div>

          {page === 3 && (
            <>
              <label>
                Trip Budget:
                <input type="text" value={tripBudget} onChange={(e) => setTripBudget(e.target.value)} required />
              </label>
            </>
          )}
          {page === 4 && (
            <>
              <label>
                Describe your perfect getaway location:
                <textarea value={getawayDescription} onChange={(e) => setGetawayDescription(e.target.value)} required />
              </label>
            </>
          )}
          <div>
            {page > 1 && (
              <button type="button" onClick={prevPage}>
                Previous
              </button>
            )}
            {page < 4 ? (
              <button type="button" onClick={nextPage}>
                Next
              </button>
            ) : loading ? (
              <button type="button" disabled>
                Generating...
              </button>
            ) : (
              <button type="submit">Generate Itinerary</button>
            )}
          </div>
        </form>
        {loading && <p>Loading...</p>}
        {generatedItinerary && (
          <div>
            <h2>Generated Itinerary</h2>
            <p>{generatedItinerary}</p>
          </div>
        )}
      </div>
    </main>
    </>
  );
}
