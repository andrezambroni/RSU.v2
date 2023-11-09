import React from 'react';
 import './style.css'; 

const EventList = ({ data }) => {
  return (
    <div className="event-list">
      <h2>Todos os Eventos</h2>
      <ul className="event-ul">
        {data.map((event) => (
          <li key={event._id} className="event-item">
            <div className="event-details">
              <h3 className="event-name">{event.name}</h3>
              <p className="event-description">{event.description}</p>
            </div>
            <button className="join-button">Participar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
