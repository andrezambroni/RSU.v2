import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import CreatePostEvents from "../../components/createPostEvents";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import SendVerification from "../../components/home/sendVerification";
import EventPost from "../../components/eventPost";
import EventList from "../../components/eventList";
import axios from "axios";

export default function Events({ setVisible, posts, loading, getAllPosts }) {
  const { user } = useSelector((state) => ({ ...state }));
  const middle = useRef(null);
  const [height, setHeight] = useState();
  const [eventsData, setEventsData] = useState([]);
  const fetchEvents = async () => {
    console.log('entrando no fetch')
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllEvents`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setEventsData(data);
    } catch (error) {
      console.log('error fetch', error)
      console.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchEvents(); // Chama a função para buscar os grupos
  }, []);

  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading,height]);

  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="Events" getAllPosts={getAllPosts} />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        {/* Passa os dados dos grupos para o componente GroupList */}
        <CreatePostEvents user={user} setVisible={setVisible} />
        {user.verified === false && <SendVerification user={user} />}
         <EventList data={eventsData} />{" "}
       
        
        {loading ? (
          <div className="sekelton_loader">
            <HashLoader color="#1876f2" />
          </div>
        ) : (
          <div className="posts">
            {posts.map((post, i) => (
              <EventPost key={i} post={post} user={user} />
            ))}
          </div>
        )}
      </div>
      <RightHome user={user} />
    </div>
  );
}
