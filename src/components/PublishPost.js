
import React, { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../contexts/Usercontext";
import { Navigate } from "react-router-dom";

export default function PublishPost(props) {

  let { setRefreshTimeline, refreshTimeline, refreshpage } = props;

  const { token, userImage } = useContext(UserContext);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [publishLoading, setPublishLoading] = useState(false);

  const tokenJwt = localStorage.getItem("token");
  const URL = "https://linkr-projeto17.herokuapp.com/";

  function sendPost(event) {
    event.preventDefault();
    setPublishLoading(true);
    const post = {
      shared_url: url,
      message: text,
    };
    const promise = axios.post(`${URL}posts`, post, {
      headers: {
        Authorization: `Bearer ${tokenJwt}`,
      },
    });

    promise.then((response) => {
      setUrl("");
      setText("");
      const newRefreshTimeline = !refreshTimeline;
      setRefreshTimeline(newRefreshTimeline);
      setPublishLoading(false);

    });
    promise.catch((error) => {
      alert("Houve um erro ao publicar seu link");
      const newRefreshTimeline = !refreshTimeline;
      setRefreshTimeline(newRefreshTimeline);
      setPublishLoading(false);
    });
  }


  return (
    <PublishPostContainer>
      <img className="user-image" src={userImage} alt="userImage" />
      <FormContainer>
        <label htmlFor="publishNewPost">
          What are you going to share today?
        </label>
        <form
          id="publishNewPost"
          onSubmit={publishLoading ? () => { } : sendPost}
        >
          <input
            name="url"
            type="url"
            placeholder="https://..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={publishLoading}
            required
          />
          <input
            name="text"
            type="text"
            placeholder="Awesome article about #javascript"
            id="postText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={publishLoading}
          />
          <input
            type="submit"
            value={publishLoading ? "Publishing" : "Publish"}
            id="postButton"
            disabled={publishLoading}
          />
        </form>
      </FormContainer>
    </PublishPostContainer>
  );
}


const PublishPostContainer = styled.section`
    width: 100%;
    height: 164px;
    padding: 10px 15px;
    background-color: #ffffff;
    box-shadow: 0px 4px 4px 0px #00000040;
    label {
      color: #707070;
      font-family: "Oswald", normal;
      font-weight: 300;
      font-size: 17px;
      line-height: 20px;
      text-align: center;
    }
    form {
      margin-top: 10px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    input {
      height: 30px;
      background-color: #efefef;
      padding-left: 11px;
      border-radius: 5px;
      border: none;
      font-family: "Oswald", normal;
      font-weight: 300;
      font-size: 13px;
    }
    #postText {
      height: 47px;
    }
    #postButton {
      background-color: #1877f2;
      color: #ffffff;
      height: 22px;
      width: 122px;
      align-self: flex-end;
      font-family: "Oswald";
      font-size: 13px;
      font-weight: 700;
      text-align: center;
    }
    .user-image {
      display: none;
    }
    @media (min-width: 600px) {
      width: 611px;
      height: 209px;
      border-radius: 16px;
      padding: 16px 22px 16px 18px;
      display: flex;
      label {
        width: 100%;
        font-size: 20px;
        font-weight: 300;
        text-align: left;
        margin-top: 5px;
      }
      input {
        font-size: 15px;
      }
      #postText {
        height: 66px;
      }
      #postButton {
        height: 31px;
        width: 112px;
        font-size: 14px;
        line-height: 17px;
      }
      .user-image {
        display: block;
        object-fit: cover;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin-right: 18px;
      }
    }
  `;

const FormContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`