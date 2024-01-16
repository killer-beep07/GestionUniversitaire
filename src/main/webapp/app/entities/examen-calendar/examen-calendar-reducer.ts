// examen-calendar-reducer.js

const examenCalendarReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { events: action.payload, error: null };
    case 'FETCH_ERROR':
      return { events: [], error: action.payload };
    default:
      return state;
  }
};

export default examenCalendarReducer;
