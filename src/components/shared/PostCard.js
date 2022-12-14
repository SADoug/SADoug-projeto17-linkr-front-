import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import ReactHashtag from "@mdnm/react-hashtag";
import { FaTrash, FaRetweet } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { ThreeDots } from "react-loader-spinner";
import { IoHeartOutline, IoHeart, IoChatbubblesOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import CommentSection from "./Comments";


export default function PostCard(props) {
  const {
    shared_url,
    profile_image,
    username,
    message,
    title_link,
    image_link,
    description_link,
    id,
    post_id,
    user_id,
  } = props.post;

  const [reset, setReset] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likePost, setLikePost] = useState(false);
  const [editing, setEditing] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [description, setDescription] = useState(props.post.description);
  const [likesCount, setLikesCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [userRetweet, setUserRetweet] = useState({ id: 0, username: "" });
  const [likesUsers, setLikesUsers] = useState([]);
  const [tooltipString, setTooltipString] = useState("");
  const [commentBar, setCommentBar] = useState(false);
  const { user, refresh } = props;
  const [exclude, setExclude] = useState(false);
  const loader = (
    <ThreeDots
      type="Puff"
      color="#FFFFFF"
      height={40}
      width={40}
      timeout={3000}
    />
  );
  const localToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const URL = "https://linkr-projeto17.herokuapp.com/";
  const inputRef = useRef(null);
  const idOriginal = post_id ? post_id : id;

  useEffect(() => {
    checkLikePublishing();
    getLikesCount();
    getCommentCount();
    getShareCount();
  }, [reset]);

  function redirectToLink() {
    window.open(shared_url, "_blank");
  }

  function getLikesCount() {
    setLoading(true);
    const config = { headers: { Authorization: `Bearer ${localToken}` } };
    const promise = axios.get(`${URL}posts/likecount/${idOriginal}`, config);

    promise.then((response) => {
      setLikesCount(Number(response.data.count));
      setLikesUsers(response.data.users);
      setLoading(false);
    });
    promise.catch((error) => {
      setLoading(false);
    });
  }

  function getCommentCount() {
    const config = { headers: { Authorization: `Bearer ${localToken}` } };
    const promise = axios.get(`${URL}posts/commentcount/${idOriginal}`, config);

    promise.then((response) => {
      setCommentCount(Number(response.data));
    });
    promise.catch((error) => {

    });
  }

  const getShareCount = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${localToken}` } };
      const promise = await axios.get(
        `${URL}posts/sharecount/${idOriginal}`,
        config
      );

      setShareCount(promise.data.count);
      setUserRetweet(promise.data.user);
    } catch (e) {

    }
  };

  useEffect(() => {
    setTooltipString(toolString());
  }, [likesUsers]);

  function likePublishing() {
    setLoading(true);
    const promise = axios.post(
      `${URL}posts/likes/${idOriginal}`,
      { idPost: id },
      {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
      }
    );
    promise.then((response) => {
      setLikePost(true);
      setLoading(false);
      setReset([]);
    });
    promise.catch((error) => {

      setLoading(false);
    });
  }


  const deletePost = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${(localToken)}` },
      };
      const response = await axios.delete(`${URL}deleteposts/${id}`, config);
      setExclude(false);

      refresh([]);
    } catch (e) {
      alert("N??o foi poss??vel excluir o post!");
      setExclude(false);

    }
    setLoading(false);
  };

  const openEdit = () => {
    setEditing(true);
    setDescriptionEdit(description);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const cancelEdit = () => {
    setEditing(false);
  };

  const sendEdit = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${(localToken)}` },
      };
      await axios.post(
        `${URL}editpost/${id}`,
        { message: descriptionEdit },
        config
      );
      setDescription(descriptionEdit);
      setEditing(false);
      setLoading(false);
    } catch (e) {

      alert("N??o foi poss??vel salvar as altera????es!");
      setLoading(false);
    }
  };

  const verifyKey = (e) => {
    switch (e.keyCode) {
      case 13:
        sendEdit();
        e.preventDefault();
        break;

      case 27:
        cancelEdit();
        e.preventDefault();
        break;

      default:
        break;
    }
  };

  const toolString = () => {
    let string = "";

    if (likePost) {
      string += "Voc??";

      if (likesCount === 4) {
        string += `, ${likesUsers[0]} e outras ${likesCount - 2} pessoas`;
      } else if (likesCount === 3) {
        string += `, ${likesUsers[0]} e outra 1 pessoa`;
      } else if (likesCount === 2) {
        string += ` e ${likesUsers[0]}`;
      }
    } else {
      if (likesCount > 3) {
        string += `${likesUsers[0]}, ${likesUsers[1]} e outras ${likesCount - 2
          } pessoas`;
      } else if (likesCount === 3) {
        string += `${likesUsers[0]}, ${likesUsers[1]} e outra 1 pessoa`;
      } else if (likesCount === 2) {
        string += `${likesUsers[0]} e ${likesUsers[1]}`;
      } else if (likesCount === 1) {
        string += `${likesUsers[0]}`;
      } else {
        string += "Nenhum";
      }
    }
    return string;
  };

  const retweetPost = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${localToken}` },
      };
      await axios.post(`${URL}posts/share`, { idPost: id }, config);
      setReset([]);
      setSharing(false);
    } catch (e) {
     
      setSharing(false);
      alert("N??o foi poss??vel retweetar o post!");
    }
    setLoading(false);
  };

  return (
    <>
      {exclude ? (
        <DeleteConfirm>
          <div className="confirm-container">
            <h2>Are you sure you want to delete this post?</h2>
            <div>
              <button
                className="cancel"
                onClick={() => {
                  setExclude(false);
                }}
              >
                No, go back
              </button>
              <button className="confirm" onClick={deletePost}>
                {loading ? loader : "Yes, delete it"}
              </button>
            </div>
          </div>
        </DeleteConfirm>
      ) : (
        <></>
      )}
      {sharing ? (
        <DeleteConfirm>
          <div className="confirm-container">
            <h2>Do you want to re-post this link?</h2>
            <div>
              <button
                className="cancel"
                onClick={() => {
                  setSharing(false);
                }}
              >
                No, cancel
              </button>
              <button className="confirm" onClick={retweetPost}>
                {loading ? loader : "Yes, share!"}
              </button>
            </div>
          </div>
        </DeleteConfirm>
      ) : (
        <></>
      )}
      <Div retweet={post_id}>
        {post_id ? (
          <div className="share-container">
            <FaRetweet className="mini-retweet-icon" />
            Re-posted by
            <p>{username}</p>
          </div>
        ) : (
          <></>
        )}
        <div className="post-container">
          <div className="right-container">
            <img
              src={post_id ? userRetweet.profile_image : profile_image}
              alt={post_id ? userRetweet.username : username}
              onClick={() =>
                navigate(`/user/${post_id ? userRetweet.id : user_id}`)
              }
            ></img>
            {likePost ? (
              <IoHeart className="likebutton marked" onClick={likePublishing} />
            ) : (
              <IoHeartOutline
                className="likebutton"
                onClick={() => {
                  if (!post_id) {
                    likePublishing();
                  }
                }}
              />
            )}
            <p
              data-tip={tooltipString}
              data-type="light"
              data-place="bottom"
              data-effect="solid"
            >
              {likesCount} likes
            </p>
            <IoChatbubblesOutline
              className="chatbutton"
              onClick={() => {
                if (!post_id) {
                  setCommentBar(!commentBar);
                }
              }}
            />
            <p>{`${commentCount} comments`}</p>
            <FaRetweet
              className="share-icon"
              onClick={() => {
                if (!post_id) {
                  setSharing(true);
                }
              }}
            />
            <p>{`${shareCount} shares`}</p>
            <ReactTooltip />
          </div>
          <div className="left-container">
            {user_id === user ? (
              <>
                {post_id ? (
                  <></>
                ) : (
                  <TiPencil
                    className="pencil-icon"
                    onClick={() => {
                      editing ? cancelEdit() : openEdit();
                    }}
                  />
                )}
                <FaTrash
                  className="trash-icon"
                  onClick={() => {
                    setExclude(true);
                  }}
                />
              </>
            ) : (
              <></>
            )}
            <p
              className="username"
              onClick={() =>
                navigate(`/user/${post_id ? userRetweet.id : user_id}`)
              }
            >
              {post_id ? userRetweet.username : username}
            </p>
            <p className="description">
              {editing ? (
                <textarea
                  disabled={loading}
                  ref={inputRef}
                  className="description-edit"
                  value={descriptionEdit}
                  onChange={(e) => {
                    setDescriptionEdit(e.target.value);
                  }}
                  onKeyDown={verifyKey}
                />
              ) : (
                <>
                  <ReactHashtag renderHashtag={(hashtagValue) => (
                    <div className="hashtag" onClick={() =>
                      navigate(`/hashtag/${hashtagValue})`)}>
                      {hashtagValue}</div>
                  )}>
                    {message}
                  </ReactHashtag>

                </>
              )}
            </p>
            <div className="link-metadata" onClick={() => redirectToLink()}>
              <div className="container-title-description">
                <p className="link-title">{title_link}</p>
                <p className="link-description">{description_link}</p>
                <p className="link-url">{shared_url}</p>
              </div>
              <img src={image_link} alt="Article"></img>
            </div>
          </div>
        </div>
      </Div>
      {commentBar ? (
        <CommentSection post={props.post} setReset={setReset} />
      ) : (
        <></>
      )}
    </>
  );
  function checkLikePublishing() {
    // setLoading(true);
    const promise = axios.post(
      `${URL}posts/checklike`,
      { idPost: id },
      {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
      }
    );
    promise.then((response) => {
      setLikePost(response.data);
      // setLoading(false);
    });
    promise.catch((error) => {
      console.log(error);
      // setLoading(false);
    });
  }
}


const DeleteConfirm = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 5;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .confirm-container {
    height: auto;
    width: 75%;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #333333;
    border-radius: 30px;
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    h2 {
      width: 200px;
      color: white;
      font-size: 20px;
      font-family: "Oswald";
      font-weight: 700;
      text-align: center;
      margin-bottom: 30px;
    }
    button {
      height: 30px;
      width: 100px;
      padding: 0 10px;
      border: none;
      border-radius: 4px;
      font-family: "Oswald";
      font-weight: 700;
      font-size: 14px;
    }
    .cancel {
      background-color: white;
      color: #1877f2;
    }
    .confirm {
      background-color: #1877f2;
      color: white;
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const Div = styled.div`
  height: auto;
  width: 100vw;
  max-width: 100vw;
  background-color: #171717;
  margin-top: 19px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  .hide {
    display: none;
  }
  .likebutton,
  .chatbutton {
    width: 100%;
    margin-top: 10px;
    align-items: center;
    font-size: 20px;
    color: #ffffff;
  }
  .marked {
    color: #ac0000;
  }
  .share-container {
    height: 33px;
    width: 100%;
    background-color: #1e1e1e;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
    color: white;
    font-size: 13px;
    p {
      font-weight: 700;
      margin-left: 5px;
    }
  }
  .mini-retweet-icon {
    margin-right: 10px;
    font-size: 20px;
  }
  .post-container {
    display: flex;
    flex-direction: row;
    padding: 9px 18px 15px 15px;
  }
  .right-container img {
    border-radius: 50%;
    width: 44px;
    height: 44px;
    object-fit: cover;
    margin-left: 12px;
  }
  .right-container {
    padding-right: 14px;
  }
  .right-container p {
    font-family: "Oswald", normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    text-align: center;
    color: #ffffff;
  }
  .left-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 4px;
    position: relative;
  }
  .trash-icon {
    position: absolute;
    top: 5px;
    right: 0px;
    color: white;
    font-size: 15px;
  }
  .share-icon {
    width: 100%;
    margin-top: 10px;
    align-items: center;
    font-size: 17px;
    color: #ffffff;
  }
  .pencil-icon {
    position: absolute;
    top: 4px;
    right: 30px;
    color: white;
    font-size: 17px;
  }
  .username {
    font-family: "Oswald";
    font-size: 17px;
    line-height: 20px;
    color: #ffffff;
  }
  .description {
    font-family: "Oswald";
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    color: #b7b7b7;
    margin-top: 7px;
    margin-bottom: 13px;
    width: 100%;
    span {
      font-weight: 700;
      color: #fff;
    }
    textarea {
      width: 100%;
      height: 45px;
      resize: none;
      font-family: "Oswald";
      border-radius: 8px;
      border: none;
      padding: 2px 5px;
    }
  }
  .link-metadata {
    width: 100%;
    height: 115px;
    display: flex;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
  }
  .link-metadata img {
    width: 100%;
    height: auto;
    object-fit: cover;
    overflow: hidden;
    border-radius: 0 11px 11px 0;
    margin: 0;
  }
  .container-title-description {
    width: 100%;
    padding: 7px 7px 8px 11px;
  }
  .link-title {
    font-family: "Oswald";
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
    margin-bottom: 4px;
    height: 26px;
    width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .link-description {
    font-family: "Oswald";
    font-size: 9px;
    line-height: 11px;
    color: #9b9595;
    margin-bottom: 4px;
    height: 44px;
    width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .link-url {
    font-family: "Oswald";
    font-size: 9px;
    line-height: 11px;
    color: #cecece;
    height: 22px;
    width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (min-width: 600px) {
    width: 611px;
    border-radius: 16px;
    padding: 17px 0 20px 0;
    position: relative;
    margin-top: ${(props) => (props.retweet ? "40px" : "19px")};
    .post-container {
      z-index: 2;
      background-color: #171717;
      padding: 9px 39px 15px 33px;
      border-radius: 20px 20px 0 0;
    }
    .share-container {
      height: 60px;
      position: absolute;
      top: -20px;
      right: 0;
      align-items: flex-start;
      padding-top: 11px;
      z-index: 1;
      border-radius: 20px 20px 0px 0px;
    }
    .likebutton {
      margin-top: 19px;
    }
    .right-container img {
      display: flex;
      width: 50px;
      height: 50px;
      margin-left: 0;
    }
    .username {
      font-size: 19px;
      line-height: 23px;
    }
    .description {
      font-size: 17px;
      line-height: 20px;
    }
    .link-metadata {
      height: 155px;
    }
    .container-title-description {
      padding: 24px 27px 23px 19px;
    }
    .link-title {
      font-size: 16px;
      line-height: 19px;
      height: 38px;
      width: 302px;
    }
    .link-description {
      font-size: 11px;
      line-height: 13px;
      height: 39px;
      margin: 5px 0 13px;
      width: 302px;
    }
    .link-url {
      font-size: 11px;
      line-height: 13px;
      width: 302px;
    }
  }
`;