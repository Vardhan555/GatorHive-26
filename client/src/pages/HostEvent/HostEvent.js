import "./HostEvent.css";
import React, { useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

function HostEventPage() {
  const token = Cookies.get("token");
  if (!token) {
    return <Redirect to="/login" />;
  }
  const [eventName, setEventName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventType, setEventType] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [category, setCategory] = useState("");
  const [posterImage, setPosterImage] = useState(null);
  const [club, setClub] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [timings, setTimings] = useState("");
  const [theme, setTheme] = useState("");

  const [capacity, setCapacity] = useState("");
  const [isFree, setIsFree] = useState("");
  const [allowGroupRegistration, setAllowGroupRegistration] = useState(false);
  const [carpooling, setCarpooling] = useState(false);
  const [alcoholAllowed, setAlcoholAllowed] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [food, setFoodOption] = useState("");
  const [isDiffAccess, setIsDiffAccess] = useState(false);
  const [guideAvailable, setGuideAvailable] = useState(false);
  const [parkingAvailable, setParkingAvailable] = useState(false);
  const [isPetAllowed, setIsPetAllowed] = useState(false);

  // const data = (e) => {
  //   e.preventDefault();
  //   Axios.post("", {

  //   });
  // };

  function createEventAtUtc(eventDate, timings) {
    // Combine eventDate and timings into a single string
    const eventDateTimeString = `${eventDate}T${timings}:00.000`;

    // Create a new Date object with the combined string and current timezone
    const eventAtCurrentTimezone = new Date(eventDateTimeString);

    // Get the UTC time in ISO format
    const eventAtUtcIso = eventAtCurrentTimezone;

    // Create a new Date object with the UTC time
    const eventAtUtc = new Date(eventAtUtcIso);

    return eventAtUtc;
  }

  // console.log(eventAtUtc.toUTCString()); // Display the time in UTC format

  const handleSubmit = async (event) => {
    event.preventDefault();

    const eventAtUtc = createEventAtUtc(eventDate, timings);

    if (isOnline === true) {
      setEventLocation("");
    }

    const eventData = {
      eventName: eventName,
      category: category,
      clubName: club,
      ifOfficial: theme === "official" ? true : false,
      food:
        food === "Veg"
          ? 0
          : food === "Non-Veg"
          ? 1
          : food === "Non-Veg/Veg"
          ? 2
          : null,
      eventDetails: eventDetails,
      eventAtUtc: eventAtUtc,
      ifPetsAllowed: isPetAllowed,
      entryFee: entryFee,
      ifGuide: guideAvailable,
      ifDifferentlyAbledAccessibility: isDiffAccess,
      ifParking: parkingAvailable,
      ifAlcohol: alcoholAllowed,
      ifRegisterAsGroup: allowGroupRegistration,
      eventType:
        eventType === "Online"
          ? 0
          : eventType === "Offline"
          ? 1
          : eventType === "Hybrid"
          ? 2
          : null,
      ifFreeGoodies: isFree,
      ifRideTogether: carpooling,
      studentOrgId: "a5873880-5861-414b-9840-4bc283471ab2",
    };
    const address = {
      roomNumber: eventLocation,
    };
    const newEventData = new FormData();
    newEventData.append("posterLink", posterImage);
    newEventData.append("eventData", JSON.stringify(eventData));
    newEventData.append("address", JSON.stringify(address));

    console.log("data:", JSON.parse(newEventData.get("eventData")));
    console.log("addres", JSON.parse(newEventData.get("address")));
    const reponse = await Axios.post(
      "http://localhost:8000/events/create",
      newEventData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log(reponse);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageChange = (event) => {
    setPosterImage(event.target.files[0]);
  };

  return (
    <div className="host-event-cont">
      <h1 className="host-event-heading">Host an Event</h1>
      <form onSubmit={handleSubmit} className="eventHost-form">
        <div className="host-main-cont">
          <div className="host-left-box">
            <label>
              Event Name:
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </label>
            <br />
            <label>
              <div className="host-event-details">
                Event Details:
                <textarea
                  value={eventDetails}
                  onChange={(e) => setEventDetails(e.target.value)}
                />
              </div>
            </label>
            <br />
            <label>
              Event Location:
              <input
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                disabled={eventType === "Online"}
              />
            </label>
            <label>
              Event type:
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Offline">Offline</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </label>
            <br />
            <label>
              Event Date:
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </label>
            <br />
            <label>
              Entry Fee:
              <input
                type="number"
                value={entryFee}
                placeholder="$"
                onChange={(e) => setEntryFee(e.target.value)}
              />
            </label>
            <br />
            <label className="event-capacity">
              Capacity:
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                min="0"
              />
              <div>
                <input
                  type="checkbox"
                  checked={!capacity}
                  onChange={() => setCapacity("")}
                />{" "}
                Unlimited
              </div>
            </label>
            <br />
            <label>
              Start Time:
              <input
                type="time"
                value={timings}
                onChange={(e) => setTimings(e.target.value)}
              />
            </label>

            <label>
              Category:
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="music">Music</option>
                <option value="sports">Sports</option>
                <option value="cultural">Cultural</option>
                <option value="academic">Academic</option>
                <option value="volunteer">Volunteer</option>
                <option value="social">Social</option>
                <option value="other">Other</option>
              </select>
            </label>
            <br />
          </div>

          <div className="host-right-box">
            <label>
              Poster Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <br />
            <label>
              Club Name:
              <select value={club} onChange={(e) => setClub(e.target.value)}>
                <option value="">Select a Club</option>
                <option value="club1">Club 1</option>
                <option value="club2">Club 2</option>
                <option value="club3">Club 3</option>
              </select>
            </label>
            <br />

            <br />
            <label>
              Theme:
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="">Select a Theme</option>
                <option value="Official">Official</option>
                <option value="Unofficial">Unofficial</option>
              </select>
            </label>
            <br />
            <label>
              Food:
              <select
                value={food}
                onChange={(e) => setFoodOption(e.target.value)}
              >
                <option value="">Select Food Options</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Non-Veg/Veg">Both Veg/Non-Veg</option>
              </select>
            </label>
            <br />
            <label>
              Allow Register as Group:
              <input
                type="checkbox"
                checked={allowGroupRegistration}
                onChange={() =>
                  setAllowGroupRegistration(!allowGroupRegistration)
                }
              />
            </label>
            <br />
            <label>
              Ridetogether:
              <input
                type="checkbox"
                checked={carpooling}
                onChange={() => setCarpooling(!carpooling)}
              />
            </label>
            <br />
            <label>
              Guide Available:
              <input
                type="checkbox"
                checked={guideAvailable}
                onChange={() => setGuideAvailable(!guideAvailable)}
              />
            </label>
            <br />
            <label>
              Parking Available:
              <input
                type="checkbox"
                checked={parkingAvailable}
                onChange={() => setParkingAvailable(!parkingAvailable)}
              />
            </label>
            <br />
            <label>
              Alcohol Allowed:
              <input
                type="checkbox"
                checked={alcoholAllowed}
                onChange={() => setAlcoholAllowed(!alcoholAllowed)}
              />
            </label>
            <br />
            <label>
              Differently Abled Accesibility:
              <input
                type="checkbox"
                checked={isDiffAccess}
                onChange={() => setIsDiffAccess(!isDiffAccess)}
              />
            </label>
            <br />
            <label>
              Pet Allowed:
              <input
                type="checkbox"
                checked={isPetAllowed}
                onChange={() => setIsPetAllowed(!isPetAllowed)}
                v
              />
            </label>
            <br />
            <label>
              Free Goodies:
              <input
                type="checkbox"
                checked={isFree}
                onChange={() => setIsFree(!isFree)}
              />
            </label>
            <button type="submit" className="create-event-btn">
              Create Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default HostEventPage;
