
import { useContext, useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoChevronDown } from "react-icons/io5";
import { IconContext } from "react-icons";
import UserContext from "../../contexts/Usercontext";
import SearchBar from "./SearchBar.js";
import axios from "axios";


export default function HeaderBar() {
    const { setToken, userImage, setUserImage, setName } = useContext(UserContext);
    const [refresh, setRefresh] = useState({ token: "" });
    const [logout, setLogout] = useState(false);
    const navigate = useNavigate();
    const URL = "https://linkr-projeto17.herokuapp.com/";

    const localToken = localStorage.getItem("token");
   
    useEffect(() => {
        if (!localToken && !userImage) {
          if (!localToken) {
          
          } else {
            setToken({ ...localToken });
            setRefresh({ ...localToken });
          }
        } else {
          const promise = axios.get(`${URL}user`, {
            headers: {
              Authorization: `Bearer ${localToken}`,
            },
          });
          promise.then(({ data }) => {
            setUserImage(data[0].profile_image);
            setName(data[0].username);
          });
          promise.catch((error) => {
            localStorage.removeItem("token");
           
          });
        }
      }, [refresh, localToken, navigate, setToken, setUserImage, setName, localToken, userImage]);

        const toLogout = async () => {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        navigate("/");
      };


      return (
        <Div logout={logout}>
          <p onClick={() => navigate("/timeline")}>linkr</p>
    
          <div className="search-container-desktop">
            <SearchBar />
          </div>
    
          <div className="right-container">
            <IconContext.Provider value={{ color: "white", size: "2em" }}>
              <div>
                <IoChevronDown
                  onClick={() => {
                    setLogout(!logout);
                  }}
                  className={"arrow " + (logout ? "arrow-down" : "arrow-up")}
                />
              </div>
            </IconContext.Provider>
    
            <img src={userImage} alt="User"></img>
            {logout ? (
              <div className="logout-container">
                <p
                  onClick={() => {
                    toLogout();
                  }}
                >
                  Logout
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Div>
      );
}


const Div = styled.div`
  background-color: #151515;
  width: 100%;
  height: 72px;
  color: white;
  padding: 12px 14px 0 17px;
  display: flex;
  align-content: center;
  justify-content: space-between;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  p {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 45px;
    line-height: 50px;
    letter-spacing: 0.05em;
  }
  .search-container-desktop {
    display: none;
  }
  img {
    border-radius: 50%;
    width: 44px;
    height: 44px;
    object-fit: cover;
    margin-left: 12px;
  }
  .arrow {
    font-size: 15px;
    //transform: ${(props) => (props.logout ? "rotate(180deg)" : "")};
  }
  .arrow-up {
    transform: rotate(0deg);
    transition: transform 0.25s ease-out;
  }
  .arrow-down {
    transform: rotate(180deg);
    transition: transform 0.25s ease-out;
  }
  .right-container {
    display: flex;
    align-items: center;
    padding-bottom: 16px;
    position: relative;
    .logout-container {
      position: absolute;
      top: 60px;
      right: -30px;
      height: 47px;
      width: 150px;
      background-color: #171717;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0 0 0 20px;
      p {
        font-size: 17px;
        font-family: "Oswald";
      }
    }
  }
  @media (min-width: 600px) {
    padding: 10px 27px 0 28px;
    .search-container-desktop {
      display: block;
      margin-top: 4px;
    }
    p {
      font-size: 49px;
      line-height: 54px;
    }
    .arrow {
      font-size: 18px;
    }
    img {
      width: 53px;
      height: 53px;
    }
  }
  `
