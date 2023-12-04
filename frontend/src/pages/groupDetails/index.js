import "./style.css";
import GroupsActive from "../../svg/groupsActive";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import CreateGroupPost from "../../components/createPostGroups";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import SendVerification from "../../components/home/sendVerification";
import GroupPost from "../../components/groupPost";
import "./style.css";

import { getMyGroups } from "../../functions/postGroups";
import GroupList from "../../components/groupList";

export default function Groups({ setVisible, posts, loading, getAllPosts }) {
  const { user } = useSelector((state) => ({ ...state }));
  const middle = useRef(null);
  const [height, setHeight] = useState();

  const [groupsData, setGroupsData] = useState([]);

  const fetchGroups = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/groupDetails`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setGroupsData(data);
    } catch (error) {
      console.log("error fetch", error);
      console.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchGroups(); // Chama a função para buscar os grupos
  }, []);

  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading, height]);
  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="Groups" 
    //   getAllPosts={getAllPosts} trocar para a função que pega os grupos que o user esta dentro

      />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        
        {user.verified === false && <SendVerification user={user} />}
        <GroupList data={groupsData} />
        <CreateGroupPost user={user} setVisible={setVisible} />
        
        
        {loading ? (
          <div className="sekelton_loader">
            <HashLoader color="#1876f2" />
          </div>
        ) : (
          <div className="posts">
            
          </div>
        )}
      </div>
      <RightHome user={user} />
    </div>
  );
}
