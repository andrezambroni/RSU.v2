import { Link } from "react-router-dom";
import { Dots } from "../../svg";

export default function ProfileMenu() {
  return (
    <div className="profile_menu_wrap">
      <div className="profile_menu">
        <Link to="/" className="profile_menu_active">
          Publicações
        </Link>
        {/* <Link to="/" className="hover1">
        Sobre
        </Link> */}
        <Link to="./friends" className="hover1">
          Amigos
        </Link>
        <Link to="/" className="hover1">
          Meus Grupos
        </Link>
        <Link to="/" className="hover1">
          Meus Eventos
        </Link>
        {/* <Link to="/" className="hover1">
          Check-ins
        </Link> */}
        {/* <Link to="/" className="hover1">
          More
        </Link> */}
        {/* <div className="p10_dots">
          <Dots />
        </div> */}
      </div>
    </div>
  );
}
