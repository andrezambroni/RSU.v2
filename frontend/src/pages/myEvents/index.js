import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import CreatePostEvents from "../../components/createPostEvents";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import SendVerification from "../../components/home/sendVerification";
import Stories from "../../components/home/stories";
import EventPost from "../../components/eventPost";
import "./style.css";


import axios from "axios";

import EventList from "../../components/eventList";

export default function Events({ setVisible, posts, loading, getAllPosts }) {
  const { user } = useSelector((state) => ({ ...state }));
  const middle = useRef(null);
  const [height, setHeight] = useState();


  const [eventsData, setEventsData] = useState([]);

  const fetchEvents = async () => {
    console.log('passei aquiiii')
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/myEvents`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data, 'data')
      setEventsData(data);
    } catch (error) {
      console.log("error fetch", error);
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchEvents(); // Chama a função para buscar os grupos
  }, []);



  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading, height]);
  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="Events" getAllPosts={getAllPosts} />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        {/* <Stories /> */}
        {user.verified === false && <SendVerification user={user} />}
        <EventList data={eventsData} />
        {/* <CreatePostEvents user={user} setVisible={setVisible} /> */}
        <CreatePostEvents user={user} setVisible={setVisible} />
        {loading ? (
          <div className="sekelton_loader">
            <HashLoader color="#1876f2" />
          </div>
        ) : (
          <div className="posts">
            {/* {posts.map((post, i) => (
              <EventPost key={i} post={post} user={user} />
            ))} */}
          </div>
        )}
      </div>
      <RightHome user={user} />
    </div>
  );
}
