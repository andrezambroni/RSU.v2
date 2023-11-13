import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import { useSelector } from "react-redux";
import Activate from "./pages/home/activate";
import Reset from "./pages/reset";
import CreatePostPopup from "./components/createPostPopup";

import CreatePostGroupPopup from "./components/createPostGroupPopup";
import CreatePostEventPopup from "./components/createPostEventPopup";

import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
  postsReducer,
  postsEventsReducer,
  postsGroupsReducer,
} from "./functions/reducers";

import Friends from "./pages/friends";

import Groups from "./pages/groups";
import Events from "./pages/events";
import { getAllGroups } from "./functions/postGroups";

import MyGroups from "./pages/myGroups";
import MyEvents from "./pages/myEvents";

function App() {
  const [visible, setVisible] = useState(false);
  const [visibleGroups, setVisibleGroups] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState(false);
  const { user, darkTheme } = useSelector((state) => ({ ...state }));
  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: "",
  });
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllposts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  // GROUPS

  const [{ loadingGroups, errorGroups, postsGroups }, dispatchGroups] =
    useReducer(postsGroupsReducer, {
      loadingGroups: false,
      postsGroups: [],
      errorGroups: "",
    });
  useEffect(() => {
    getAllGroupsPosts();
  }, []);
  const getAllGroupsPosts = async () => {
    try {
      dispatchGroups({
        type: "POSTS_GROUPS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllGroupsPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data, "data");
      dispatchGroups({
        type: "POSTS_GROUPS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      console.log(error, "deu erro");
      dispatchGroups({
        type: "POSTS_GROUPS_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  //EVENTS

  const [{ loadingEvents, errorEvents, postsEvents }, dispatchEvents] =
    useReducer(postsEventsReducer, {
      loadingEvents: false,
      postsEvents: [],
      errorEvents: "",
    });
  useEffect(() => {
    getAllEventsPosts();
  }, []);
  const getAllEventsPosts = async () => {
    try {
      dispatchEvents({
        type: "POSTS_EVENTS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPostEvents`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatchEvents({
        type: "POSTS_EVENTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatchEvents({
        type: "POSTS_EVENTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div className={darkTheme && "dark"}>
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={posts}
          dispatch={dispatch}
        />
      )}

      {visibleGroups && (
        <CreatePostGroupPopup
          user={user}
          setVisible={setVisibleGroups}
          posts={postsGroups}
          dispatch={dispatchGroups}
        />
      )}

      {visibleEvents && (
        <CreatePostEventPopup
          user={user}
          setVisible={setVisibleEvents}
          posts={postsEvents}
          dispatch={dispatchEvents}
        />
      )}

      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/profile"
            element={
              <Profile setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />

          <Route
            path="/groups"
            element={
              <Groups
                setVisible={setVisibleGroups}
                posts={postsGroups}
                loading={loadingGroups}
                getAllPosts={getAllGroupsPosts}
              />
            }
            exact
          />

          <Route
            path="/events"
            element={
              <Events
                setVisible={setVisibleEvents}
                posts={postsEvents}
                loading={loadingEvents}
                getAllPosts={getAllEventsPosts}
              />
            }
            exact
          />

          <Route
            path="/profile/:username"
            element={
              <Profile setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path="/friends"
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path="/friends/:type"
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path="/"
            element={
              <Home
                setVisible={setVisible}
                posts={posts}
                loading={loading}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />

          <Route
            path="/myGroups"
            element={
              <MyGroups setVisible={setVisible} getAllGroups={getAllGroups} />
            }
            exact
          />

<Route
            path="/myEvents"
            element={
              <MyEvents setVisible={setVisible}  />
            }
            exact
          />

          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
