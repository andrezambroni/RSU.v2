import React from "react";
import { Link } from "react-router-dom";

export default function LeftLink({ img, link, text, notification }) {
  return (
    <Link to={link} className="left_link hover2">
      <img src={`../../../left/${img}.png`} alt="" />
      {notification !== undefined ? (
        <div className="col">
          <div className="col_1">Meus Grupos
          </div>
          
          {/* <div className="col_2">{notification}</div> */}
        </div>
      ) : (
        <span>Meus Eventos</span>
      )}
    </Link>
  );
}
