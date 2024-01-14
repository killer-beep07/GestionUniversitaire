import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { makeRequest } from './api-util';

const localizer = momentLocalizer(moment);

const EventComponent = ({ event }) => (
  <div
    style={{
      fontSize: '12px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{event.title}</div>
    <div style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>{event.description}</div>
  </div>
);

const ExamenCalendar = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExamenDetails = async () => {
      try {
        const examenDetails = await makeRequest('GET', '/examens/details');
        console.log('Examen Details:', examenDetails);

        const formattedEvents = examenDetails.map(([nomExamen, date, heureDebut, heureFin, nomSalleExamen]) => {
          const eventDate = moment(date).toDate();

          return {
            title: nomExamen,
            start: eventDate,
            end: eventDate,
            description: `Heures: ${heureDebut}-${heureFin}\nSalle: ${nomSalleExamen}`,
            allDay: false,
          };
        });

        console.log('Formatted Events:', formattedEvents);
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching examen details:', error);
        setError(error.message || "Une erreur s'est produite lors de la récupération des détails des examens.");
      }
    };

    fetchExamenDetails();
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: isSelected ? '#3498DB' : '#3498DB',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
    };
    return {
      style: style,
    };
  };
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', textAlign: 'center' }}>
      <h2 style={{ color: '#3498DB', display: 'inline-block' }}>Examen Calendar</h2>
      {error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          tooltipAccessor={event => event.description}
          eventPropGetter={eventStyleGetter}
          components={{
            event: EventComponent,
          }}
        />
      )}
    </div>
  );
};

export default ExamenCalendar;
