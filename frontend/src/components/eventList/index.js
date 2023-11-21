import React from 'react';
 import './style.css'; 

import { joinEvent } from '../../functions/postEvents'

const EventList = ({ data,token }) => {
  return (
    <div className="event-list">
      <h2>Todos os Eventos</h2>
      <ul className="event-ul">
        {data.map((event) => (
          <li key={event._id} className="event-item">
            <div className="event-details">
              <h3 className="event-name">{event.name}</h3>
              <p className="event-description">{event.description}</p>
              <p className="event-data">{event.date}</p>
              <p className="event-local">{event.local}</p>
            </div>
            {token && (
              <button
                className="join-button"
                onClick={() => joinEvent(event._id, token)}
              >
                Participar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
