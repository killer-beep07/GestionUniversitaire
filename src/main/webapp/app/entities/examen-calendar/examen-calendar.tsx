import React, { useState, useEffect, useReducer } from 'react';
import { Calendar, momentLocalizer, EventPropGetter } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import examenCalendarReducer from './examen-calendar-reducer';

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
  const [state, dispatch] = useReducer(examenCalendarReducer, { events: [], error: null });

  useEffect(() => {
    const fetchExamenDetails = async () => {
      try {
        const response = await axios.get('/api/examen/examens/details');

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid data format received from the server');
        }

        const examenDetailsArray = response.data;
        console.log('Examen Details:', examenDetailsArray);

        const formattedEvents = examenDetailsArray.map(examenDetails => {
          if (!Array.isArray(examenDetails) || examenDetails.length < 5) {
            throw new Error('Invalid data format for examen details');
          }

          const [nomExamen, date, heureDebut, heureFin, nomSalleExamen] = examenDetails;
          const eventDate = moment(date).toDate();
          const formattedHeureDebut = heureDebut || 'N/A';
          const formattedHeureFin = heureFin || 'N/A';
          const formattedNomSalleExamen = nomSalleExamen || 'N/A';

          return {
            title: nomExamen,
            start: moment(`${date} ${formattedHeureDebut}`, 'YYYY-MM-DD HH:mm').toDate(),
            end: moment(`${date} ${formattedHeureFin}`, 'YYYY-MM-DD HH:mm').toDate(),
            description: `Salle: ${formattedNomSalleExamen}`,
            allDay: false,
          };
        });

        console.log('Formatted Events:', formattedEvents);
        dispatch({ type: 'FETCH_SUCCESS', payload: formattedEvents });
      } catch (error) {
        console.error('Error fetching examen details:', error);
        dispatch({
          type: 'FETCH_ERROR',
          payload: error.message || "Une erreur s'est produite lors de la récupération des détails des examens.",
        });
      }
    };

    fetchExamenDetails();
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: isSelected ? '#3498DB' : '#3498DB',
      borderRadius: '8px', // Coins arrondis
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Ombrage léger
      opacity: 0.9,
      color: 'white',
      border: '0px',
      display: 'block',
    };

    return {
      style: style,
    };
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        textAlign: 'center',
        border: '2px solid #3498DB',
        borderRadius: '12px', // Coins arrondis pour le conteneur principal
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', // Ombrage plus prononcé pour le conteneur principal
      }}
    >
      <h2 style={{ color: '#3498DB', display: 'inline-block', borderBottom: '2px solid #3498DB', padding: '15px' }}>Examen Calendar</h2>
      {state.error ? (
        <div style={{ color: '#333', padding: '15px' }}>{state.error}</div>
      ) : (
        <Calendar
          localizer={localizer}
          events={state.events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          tooltipAccessor={(event: any) =>
            `${event.title}\n${moment(event.start).format('HH:mm')}-${moment(event.end).format('HH:mm')}\n ${event.description}`
          }
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
