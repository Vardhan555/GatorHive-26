import React, { useState } from "react";
import "./EventsHosted.css";

function EventsHosted() {
  const eventsData = [
    {
      id: 1,
      eventName: "Football Event",
      categoryName: "sports",
      posterLink:
        "https://xray.ufl.edu/wordpress/files/2023/02/research-day-450x600.png",
      clubName: "UF Sports CLub",
      eventLocation: "UF Campus, Norman Hall",
      eventDetails:
        "The music event was an electrifying experience that left the audience spellbound. The stage was adorned with colorful lights and a sound system that was capable of filling the entire venue with music that ranged from soft.",
      eventDate: "2023-04-15",
    },

    {
      id: 2,
      eventName: "Research Celebration",
      categoryName: "academic",
      posterLink:
        "https://xray.ufl.edu/wordpress/files/2023/02/research-day-450x600.png",
      clubName: "Gators Research Club",
      eventLocation: "UF Campus, Norman Hall",
      eventDetails:
        "The music event was an electrifying experience that left the audience spellbound. The stage was adorned with colorful lights and a sound system that was capable of filling the entire venue with music that ranged from soft.",
      eventDate: "2023-04-20",
    },
  ];

  const [event, setEvents] = useState(eventsData);

  function handleEventCardClick(eventId) {
    window.location.href = `/event/${eventId}`;
  }

  return (
    <div className="App">
      <h1>Events Hosted</h1>
      <div className="hosted-event-list">
        {event.map((event) => (
          <div
            className="hosted-event-card"
            key={event.id}
            onClick={() => handleEventCardClick(event.id)}
          >
            <div className="hosted-event-image">
              <img src={event.posterLink} alt={event.eventName} />
            </div>
            <div className="hosted-event-details-right">
              <div className="hosted-eventname-tag">
                <h2>{event.eventName}</h2>
                <button className="hosted-event-tag">
                  #{event.categoryName}
                </button>
              </div>

              <div className="hosted-event-club">{event.clubName}</div>
              <div className="hosted-event-date">Date: {event.eventDate}</div>
              <div className="hosted-event-date">{event.eventLocation}</div>
              <div className="hosted-event-details">{event.eventDetails}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsHosted;
