import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

const CalendarWithEvents = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleEventSubmit = (data) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [selectedDate.toLocaleDateString()]: data,
    }));
    const updatedEvents = {
      ...events,
      [selectedDate.toLocaleDateString()]: data,
    };
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  useEffect(() => {
    const eventsFromStorage = localStorage.getItem("events");
    if (eventsFromStorage) {
      setEvents(JSON.parse(eventsFromStorage));
    }
  }, []);
  
  

  const handleEventRemove = () => {
    setEvents((prevEvents) => {
      const newEvents = { ...prevEvents };
      delete newEvents[selectedDate.toLocaleDateString()];
      return newEvents;
    });
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <Calendar value={selectedDate} onClickDay={handleDateClick} />
      </div>
      <div className="event-form">
        <h3>{selectedDate.toLocaleDateString()}</h3>
        <EventForm onSubmit={handleEventSubmit} />
        {events[selectedDate.toLocaleDateString()] && (
          <EventDetails event={events[selectedDate.toLocaleDateString()]} onRemove={handleEventRemove} />
        )}
      </div>
    </div>
  );
};

const EventForm = ({ onSubmit }) => {
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ time, description });
    setTime('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Time
        <input class="input-date" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </label>
      <label>
        Description
        <input class="input-date"  value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit">Add Event</button>
    </form>
  );
};

const EventDetails = ({ event, onRemove }) => {
  return (
    <div className="event-details">
      <h4>Event details:</h4>
      <h3>{event.time}</h3>
      <p>{event.description}</p>
      <button onClick={onRemove}>Remove Event</button>
    </div>
  );
};

export default CalendarWithEvents;
