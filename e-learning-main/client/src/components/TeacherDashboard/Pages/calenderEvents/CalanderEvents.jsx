import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';  // Import the French locale
import axios from 'axios';
import moment from 'moment';
import AddEventModal from './AddEventModal';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

function CalanderEvents() {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    // Charger les événements lorsque le composant est monté
    handleDatesSet({ start: moment().startOf('month'), end: moment().endOf('month') });
  }, []);

  async function handleEventAdded(data) {
    try {
      const response = await axios.post('http://localhost:3000/api/calander/createEvent', {
        start: data.start,
        end: data.end,
        title: data.title,
        googleMeetURL: data.googleMeetURL,
      });
      console.log(response.data); // Afficher la réponse du serveur pour le débogage
      handleDatesSet({ start: data.start, end: data.end });
    } catch (error) {
      console.error(error);
    }
  }

  function handleEventContent(eventInfo) {
    // Récupérer l'URL Google Meet de l'événement
    const googleMeetURL = eventInfo.event.extendedProps.googleMeetURL;
    // Vérifier si l'URL Google Meet est définie
    if (googleMeetURL) {
      // Ajouter le lien comme attribut href dans le titre de l'événement
      return { html: `<a href="${googleMeetURL}" target="_blank"><b>${eventInfo.event.title}</b></a>` };
    } else {
      return { html: `<b>${eventInfo.event.title}</b>` };
    }
  }

  async function handleDatesSet(data) {
    const response = await axios.get('http://localhost:3000/api/calander/getEvents?start=' + moment(data.start).toISOString() + '&end=' + moment(data.end).toISOString());
    setEvents(response.data);
  }

  const onEventAdded = async (event) => {
    try {
      await handleEventAdded(event);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <button
        className="btn btn-primary"
        style={{ marginBottom: "10px" }}
        onClick={() => setModalOpen(true)}
      >
        Ajouter un événement
      </button>
      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          ref={calendarRef}
          events={events}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale={frLocale}  // Set the locale to French
          eventAdd={onEventAdded}
          eventContent={handleEventContent} // Utilisez eventContent au lieu de eventRender
          datesSet={handleDatesSet}
        />
      </div>
      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={onEventAdded} // Passer la fonction onEventAdded directement au composant modal
      />
    </section>
  );
}

export default CalanderEvents;
