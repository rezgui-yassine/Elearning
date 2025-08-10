import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useState, useRef, useEffect } from "react";

import axios from "axios";
import moment from "moment";

function EventsStudents() {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    // Charger les événements lorsque le composant est monté
    handleDatesSet({
      start: moment().startOf("month"),
      end: moment().endOf("month"),
    });
  }, []);

  function handleEventContent(eventInfo) {
    // Récupérer l'URL Google Meet de l'événement
    const googleMeetURL = eventInfo.event.extendedProps.googleMeetURL;
    // Vérifier si l'URL Google Meet est définie
    if (googleMeetURL) {
      // Ajouter le lien comme attribut href dans le titre de l'événement
      return {
        html: `<a href="${googleMeetURL}" target="_blank"><b>${eventInfo.event.title}</b></a>`,
      };
    } else {
      return {
        html: `<b>${eventInfo.event.title}</b>`,
      };
    }
  }
  async function handleDatesSet(data) {
    const response = await axios.get(
      "http://localhost:3000/api/calander/getEvents?start=" +
        moment(data.start).toISOString() +
        "&end=" +
        moment(data.end).toISOString()
    );
    setEvents(response.data);
  }

  const eventRender = (info) => {
    // Récupérer l'URL Google Meet du titre de l'événement
    const googleMeetURL = info.event.extendedProps.googleMeetURL;
    // Vérifier si l'URL Google Meet est définie
    if (googleMeetURL) {
      // Ajouter le lien comme attribut href dans le titre de l'événement
      info.el.querySelector(
        ".fc-title"
      ).innerHTML = `<a href="${googleMeetURL}" target="_blank">${info.event.title}</a>`;
    }
  };

  return (
    <section>
      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          ref={calendarRef}
          events={events}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          eventContent={handleEventContent} // Utilisez eventContent au lieu de eventRender
          datesSet={handleDatesSet}
        />
      </div>
    </section>
  );
}

export default EventsStudents;
