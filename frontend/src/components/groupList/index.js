import React from 'react';
import './style.css';

import { joinGroup } from '../../functions/postGroups';

const GroupList = ({ data, token }) => {
  return (
    <div className="group-list">
      <h2>Todos os Grupos</h2>
      <ul className="group-ul">
        {data.map((group) => (
          <li key={group._id} className="group-item">
            <div className="group-details">
              <h3 className="group-name">{group.name}</h3>
              <p className="group-description">{group.description}</p>
              <p className="group-description">{group.category}</p>
            </div>
            <button className="join-button" onClick={() => joinGroup(group._id, token)}>
              Participar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
