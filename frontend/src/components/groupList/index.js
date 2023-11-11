import React from 'react';
import './style.css';

const GroupList = ({ data, joinGroup }) => {
  return (
    <div className="group-list">
      <h2>Todos os Grupos</h2>
      <ul className="group-ul">
        {data.map((group) => (
          <li key={group._id} className="group-item">
            <div className="group-details">
              <h3 className="group-name">{group.name}</h3>
              <p className="group-description">{group.description}</p>
            </div>
            <button className="join-button" onClick={() => joinGroup(group._id)}>
              Participar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
