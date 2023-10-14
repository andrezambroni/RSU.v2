import { Feeling, LiveVideo, Photo } from "../../svg";
import UserMenu from "../header/userMenu";
import "./style.css";
export default function CreateGroupPost({ user, setVisible, profile }) {
  return (
    <div className="createPost">
      <div className="createPost_header">
        <img src={user?.picture} alt="" />
        <div
          className="open_post hover2"
          onClick={() => {
            setVisible(true);
          }}
        >
          Poste Algo, {user?.first_name}
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        {/* <div className="createPost_icon hover1">
          <LiveVideo color="#f3425f" />
          Live Video
        </div> */}
        <div className="createPost_icon hover1">
          <Photo color="#4bbf67" />
          Foto/Video
        </div>
        {profile ? (
          <div className="createPost_icon hover1">
            <i className="lifeEvent_icon"></i>
            Life Event
          </div>
        ) : (
          <div className="createPost_icon hover1">
            <Feeling color="#f7b928" />
            Atividade
          </div>
        )}
      </div>
    </div>
  );
}
