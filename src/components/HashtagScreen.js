import styled from "styled-components";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { TailSpin } from "react-loader-spinner";
import { useState, useEffect } from "react";

import HeaderBar from "./shared/HeaderBar";
import PublishPost from "./PublishPost";
import PostCard from "./shared/PostCard";
import SearchBar from "./shared/SearchBar";
import { useNavigate, useParams } from "react-router-dom";


export default function HashgtagScreen() {

  const [refreshTimeline, setRefreshTimeline] = useState(false);
  const [posts, setPosts] = useState(["initial"]);
  const [refresh, setRefresh] = useState([]);
  const [user, setUser] = useState({});
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [Hashtags, setHashtags] = useState("");

  const localToken = localStorage.getItem("token");
  const URL =  "https://linkr-projeto17.herokuapp.com/posthashtags/";

  useEffect(() => {
   
      request();
  }, [refreshTimeline]);

  
  const { name } = useParams();
  console.log(name)
  async function request() {
    try {
      const config = { headers: { Authorization: `Bearer ${localToken}` } };
      const response = await axios.get(`${URL}${name}`, config);
      const user = await axios.get(`${URL}userToken`, config);
      
      setUser(user.data);
    } catch (e) {
      setPosts(["error"]);
      console.log(e);
    }
  }

  async function requestGetPosts() {
    try {
      const config = { headers: { Authorization: `Bearer ${localToken}` } };
      
      const response = await axios.get(`${URL}${name}`, config);
        setPosts(response.data);
        console.log("REQUEST", response)
  
    } catch (e) {
      setPosts(["error"]);
      console.log(e, "requestGetPosts");
    }
  }

  function renderPosts(posts) {
    console.log(posts)
    if (posts.length === 0) {
      return (
        <div className="message-container">
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
   if (posts){
     return posts.map((post, index) => {
       return (
         <PostCard key={index} post={post} user={user.id} refresh={setRefresh} />
       );
     });
    }
  }

  useEffect(() => {
    const URL = "https://linkr-projeto17.herokuapp.com/hashtags";
    const promise = axios.get(URL);
    promise.then(response => {
      setHashtags(response.data)
      response.data.map(hashtags => console.log("hashgtag data", hashtags.name));
    })
    promise.catch(err => {
      alert("Data invalid")
    });
  }, []);
  console.log("HASHTAGS", Hashtags)

  return posts[0] === "initial" ? (
    <Div>
      <HeaderBar />
      <div className="timeline-screen-container">
        <div className="timeline-container">
          <div className="search-container-mobile">
            <SearchBar />
          </div>

          <h1>timeline</h1>
          
          <div className="message-container">
            <p className="message">Loading . . .</p>
          </div>
        </div>
        <div className="trending-hashtags-container">
          <Tranding>
          <h1>trending</h1>
        <div>
        </div>
          {Hashtags && (
            Hashtags.map(hashtags =>  <a key={hashtags.id} href="https://www.w3schools.com"># {hashtags.name}</a>)
          )}
          </Tranding>
        </div>
      </div>
    </Div>
  ) : (
    <Div>
      <HeaderBar />
      <div className="timeline-screen-container">
        <div className="timeline-container">
          <div className="search-container-mobile">
            <SearchBar />
          </div>

          <h1>timeline</h1>
       

          <div className="infite-scroll-container">
            <InfiniteScroll
              pageStart={0}
              loadMore={requestGetPosts}
              hasMore={loadMore}
              loader={
                <div className="loader" key={page}>
                  <TailSpin
                    ariaLabel="loading-indicator"
                    height="50"
                    width="50"
                    color="grey"
                  />
                  <p className="loader-text">Loading more posts...</p>
                </div>
              }
            >
              {renderPosts(posts)}
            </InfiniteScroll>
          </div>
        </div>
        <div className="trending-virtual-container">
          <div className="trending-container">
          <Tranding>
          <h1 className="titulo">trending</h1>
        <div className="separador">
        </div>
        <div className= "hashtags">
          {Hashtags && (
            Hashtags.map(hashtags => <a key={hashtags.id} href="https://www.w3schools.com"># {hashtags.name}</a>)
          )}
          </div>
          </Tranding>
          </div>
        </div>
      </div>
    </Div>
  );

}

const Tranding = styled.div`

width: 301px;
height: 406px;

background: #171717;
border-radius: 16px;

.hashtags {
display: flex;
flex-direction: column;
}
.titulo {

width: 127px;
height: 20px;
margin-left: 16px;


font-family: 'Oswald';
font-style: normal;
font-weight: 700;
font-size: 27px;
line-height: 40px;
color: #FFFFFF;
}
.separador {

width: 300px;
height: 0px;
top: 2px;
border: 1px solid #484848;
}
a {
  color: #FFFFFF;
  margin-left: 16px;
  margin-top: 10px;
  
}
`

const Div = styled.div`
  overflow-x: hidden;
  .timeline-screen-container {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    
  }
  .timeline-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    font-family: "Oswald";
    font-weight: 700;
    font-size: 33px;
    line-height: 49px;
    color: white;
    margin: 19px 0 19px 30px;
    width: 100%;
    text-align: left;
  }
  .message-container {
    height: auto;
    width: 100%;
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
  .trending-virtual-container,
  .trending-container {
    display: none;
  }
  
  .search-container-mobile {
    margin-top: 82px;
  }

  .infite-scroll-container {
    height: auto;
    overflow: auto;
    overflow-y: hidden;
  }
  .loader {
    margin-top: 83px;
    padding-bottom: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .loader-text {
    margin-top: 10px;
    font-family: "Oswald";
    font-size: 22px;
    line-height: 26px;
    letter-spacing: 0.05em;
    color: #6d6d6d;
  }
  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .search-container-mobile {
      display: none;
    }
    h1 {
      width: 611px;
      font-size: 43px;
      line-height: 64px;
      margin: calc(78px + 72px) 0 43px;
    }
    .timeline-screen-container {
      max-width: 937px;
    }
    .trending-virtual-container {
      display: block;
      margin-left: 25px;
      margin-top: 255px;
      width: 311px;
      position: relative;
    }
    .trending-container {
      width: 311px;
      position: fixed;
      top: 107px;
      display: block;
    }
  }
`;