import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import HeaderBar from "./shared/HeaderBar";
import PostCard from "./shared/PostCard";
import UserContext from "../contexts/Usercontext";
import SearchBar from "./shared/SearchBar";

export default function UserTimelineScreen() {
  const { id } = useParams();

  const [refreshTimeline, setRefreshTimeline] = useState(false);
  const [posts, setPosts] = useState(["initial"]);
  const { token, setToken } = useContext(UserContext);
  const [refresh, setRefresh] = useState([]);
  const [user, setUser] = useState({});
  const [pageUser, setPageUser] = useState({});

  
  const navigate = useNavigate();

  const URL = "https://linkr-projeto17.herokuapp.com/";
  const localToken = localStorage.getItem("token");

  useEffect(() => {
      if (!localToken) {
        navigate("/");
      } else {
        setToken({ ...localToken });
      }
    requestGetUserPosts();
  }, [refreshTimeline, localToken, navigate, setToken, token.token]);

  useEffect(() => {
    request();
  }, [refresh, id]);


  async function request() {
    try {
      const config = {
        headers: { Authorization: `Bearer ${(localToken)}` },
      };
      const user = await axios.get(`${URL}userToken`, config)
      const response = await axios.get(`${URL}user/${id}`, config);
      const pageUserResult = await axios.get(`${URL}users/${id}`, config);
      setPageUser(pageUserResult.data);
      setPosts(response.data);
      setUser(user.data);
    } catch (e) {
      setPosts(["error"]);
      console.log(e);
    }
  }

  async function requestGetUserPosts() {
    try {
      const config = {
        headers: { Authorization: `Bearer ${(localToken)}` },
      };
      const response = await axios.get(`${URL}user/${id}`, config);
      setPosts(response.data);
    } catch (e) {
      setPosts(["error"]);
      console.log(e);
    }
  }

  function renderPosts(posts) {
    if (posts.length === 0) {
      return (
        <div className="message-container">
          <p className="message">There are no posts yet</p>
        </div>
      );
    }

    if (posts[0] === "error") {
      return (
        <div className="message-container">
          <p className="message">
            An error occured while trying to fetch the posts, please refresh the
            page
          </p>
        </div>
      );
    }

    return posts.map((post) => {
      const { id } = post;

      return (
        <PostCard key={id} post={post} user={user.id} refresh={setRefresh} />
      );
    });
  }

  return posts[0] === "initial" ? (
    <Div>
      <HeaderBar />
      <div className="timeline-screen-container">
        <div className="timeline-container">
          <h1>{pageUser ? pageUser.username : "User"} posts</h1>
          <div className="message-container">
            <p className="message">Loading . . .</p>
          </div>
        </div>
      </div>
    </Div>
  ) : (
    <Div>
      <HeaderBar />
      <div className="search-container-mobile">
        <SearchBar />
      </div>
      <div className="page-title">
        <div className="user-page">
          <img src={pageUser.profile_image} alt="user" />
          <h1>{pageUser ? pageUser.username : "User"} posts</h1>
        </div>
      </div>
      <div className="timeline-screen-container">
        <div className="timeline-container">{renderPosts(posts)}</div>
      </div>
    </Div>
  );
}
const Div = styled.div`
  .timeline-screen-container {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    max-width: 100vw;
  }
  .timeline-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .user-page {
    display: flex;
    align-items: center;
  }
  .search-container-mobile {
    margin-top: 82px;
    display: flex;
    justify-content: center;
  }
  .page-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 19px 0 19px 18px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 15px;
      object-fit: cover;
    }
    
    .hide {
      display: none;
    }
  }
  h1 {
    font-family: "Oswald";
    font-weight: 700;
    font-size: 33px;
    line-height: 49px;
    color: white;
  }
  .message-container {
    height: auto;
    width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    margin: 0 auto;
    margin-top: 30px;
  }
  .message {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 33px;
    text-align: center;
  }
  @media (min-width: 600px) {
    max-width: 937px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    .page-title {
      width: 100%;
      margin: 0 auto;
      margin: calc(78px + 72px) 0 43px;
      img {
        margin-right: 18px;
      }
    }
    .message-container {
      width: 611px;
    }
    h1 {
      width: 100%;
      font-size: 43px;
      line-height: 64px;
    }
    .search-container-mobile {
      display: none;
    }
    .timeline-screen-container {
      max-width: 937px;
    }
  }
`;

