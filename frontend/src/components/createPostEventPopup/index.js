import React, { useRef, useState } from "react";
import "./style.css";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import useClickOutside from "../../helpers/clickOutside";
import { createPostEvents } from "../../functions/postEvents";
import PulseLoader from "react-spinners/PulseLoader";
import { useDispatch } from "react-redux";
import PostError from "./PostError";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";

export default function CreatePostEventPopup({
  user,
  setVisible,
  posts,
  dispatch,
  profile,
}) {
  const popup = useRef(null);
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState("");
  const [background, setBackground] = useState("");

  const [category, setCategory] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  // const [eventDetails, setEventDetails] = useState({
  //   title: "",
  //   date: "",
  //   location: "",
  //   description: "",
  //   category: "",
  //   name: "", // Adicione o campo 'name'
  // });

  useClickOutside(popup, () => {
    setVisible(false);
  });

  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPostEvents(
        null,
        background,
        text,
        null,
        user.id,
        user.token
        // eventDetails.category,
        // eventDetails.description,
        // eventDetails.name
      );
      setLoading(false);
      if (response.status === "ok") {
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POSTS_EVENTS_SUCCESS",
          payload: [response.data, ...posts],
        });
        setBackground("");
        setText("");
        setEventName("");
        setEventDescription("");
        setVisible(false);
      } else {
        setError(response);
      }
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = `${user.username}/post_images`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      const response = await uploadImages(formData, path, user.token);

      const res = await createPostEvents(
        null,
        null,
        text,
        response,
        user.id,
        user.token,
        category,
        eventName,
        eventDate,
        eventDescription,
        eventLocation
      );
      setLoading(false);
      if (res.status === "ok") {
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
          payload: [res.data, ...posts],
        });
        setText("");
        setImages("");
        setVisible(false);
        setEventName("");
        setEventDate("");
        setEventDescription("");
        setEventLocation("");
      } else {
        setError(res);
      }
    } else if (text) {
      setLoading(true);
      const response = await createPostEvents(
        null,
        null,
        text,
        null,
        user.id,
        user.token,
        category,
        eventName,
        eventDate,
        eventDescription,
        eventLocation
      );
      setLoading(false);
      if (response.status === "ok") {
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
          payload: [response.data, ...posts],
        });
        setBackground("");
        setText("");
        setVisible(false);
        setEventName("");
        setEventDate("");
        setEventDescription("");
        setEventLocation("");
      } else {
        setError(response);
      }
    } else {
      console.log("nothing");
    }
  };

  return (
    <div className="blur">
      <div className="postBox" ref={popup}>
        {error && <PostError error={error} setError={setError} />}
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setVisible(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user.first_name} {user.last_name}
            </div>
            <div className="box_privacy">
              {/* <select
                className="category"
                value={eventDetails.category}
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, category: e.target.value })
                }
              >
                <option>--Selecionar--</option>
                <option id="palestra">Palestra</option>
                <option id="festa">Festa</option>
                <option id="evento_universitario">Evento Universitário</option>
                <option id="outro">Outro</option>
              </select> */}

              {/* Campos de entrada para os detalhes do evento */}
              <input
                type="text"
                placeholder="Nome do Evento"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Data do Evento"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
              <input
                type="text"
                placeholder="Local do Evento"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
              />

              <input
                type="text"
                placeholder={`Descreva seu evento, ${user.first_name}`}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />

              {/* Novo campo para a categoria do evento */}
              <select
                className="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>--Selecionar--</option>
                <option id="palestra">Palestra</option>
                <option id="festa">Festa</option>
                <option id="evento_universitario">Evento Universitário</option>
                <option id="outro">Outro</option>
              </select>
            </div>
          </div>
        </div>

        {!showPrev ? (
          <>
            <EmojiPickerBackgrounds
              text={text}
              user={user}
              setText={setText}
              showPrev={showPrev}
              setBackground={setBackground}
              background={background}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
            setError={setError}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />

        

        <button
          className="post_submit"
          onClick={() => {
            postSubmit();
          }}
          disabled={loading}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : "Criar Evento"}
        </button>
      </div>
    </div>
  );
}
