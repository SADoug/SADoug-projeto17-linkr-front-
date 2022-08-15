import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";
import { DebounceInput } from "react-debounce-input";
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../contexts/Usercontext';


export default function SearchBar(){
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState();
    const [refresh, setRefresh] = useState(false);
    const { token } = useContext(UserContext);

    const navigate = useNavigate();
    const localToken = localStorage.getItem("token");
    const URL = "http://localhost:4000/";

    useEffect(() => {
        if (!!search) {
          const promise = axios.get(`${URL}users/search?user=${search}`, {
            headers: {
              Authorization: `Bearer ${localToken}`,
            },
          });
          promise.then((response) => setSearchResults(response.data));
          promise.catch((error) => console.log(error.response.data));
        }
      }, [refresh, search, localToken]);
    

      return (
        <Container>
          <SearchBarDiv>
            <DebounceInput
              minLength={3}
              debounceTimeout={300}
              onChange={(event) => {
                setSearch(event.target.value);
                setRefresh(!refresh);
              }}
              value={search}
              placeholder="Search for people and friends"
            />

            <div className="icon">
              <AiOutlineSearch
                onClick={() => {
                  if (searchResults === true) {
                    navigate(`/user/${searchResults[0].id}`);
                  }
                }}
              />
            </div>
          </SearchBarDiv>
          {searchResults === true ? (
            <ResultContainer>
              {searchResults.map((result, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setSearchResults([]);
                      setSearch("");
                      navigate(`/user/${result.id}`);
                    }}
                  >
                    <img src={result.picture} alt="user" />
                    <p>{result.username}</p>
                  </li>
                );
              })}
            </ResultContainer>
          ) : (
            <></>
          )}
        </Container>
      );
    }


    const Container = styled.div`
    background-color: #e7e7e7;
    border-radius: 8px;
  `;
  
  const ResultContainer = styled.ul`
    padding-bottom: 23px;
    li {
      width: 100%;
      display: flex;
      align-items: center;
      padding-left: 17px;
      margin-top: 14px;
      img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
        margin-right: 12px;
      }
      p {
        font-size: 19px;
        line-height: 23px;
        color: #515151;
      }
      .following {
        color: #c5c5c5;
        margin-left: 7px;
      }
    }
    @media (min-width: 600px) {
      li {
        p {
          font-family: "Lato";
          font-size: 19px;
          font-weight: 400;
          line-height: 23px;
          color: #515151;
        }
      }
    }
  `;
  
  const SearchBarDiv = styled.div`
    width: 350px;
    height: 45px;
    background: #ffffff;
    border-radius: 8px;
    position: relative;
    input {
      height: 100%;
      width: 100%;
      border-style: none;
      border-radius: 8px;
      padding-left: 16px;
      padding-right: 50px;
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 17px;
      line-height: 20px;
    }
    .icon {
      position: absolute;
      top: 12px;
      right: 14px;
      opacity: 0.4;
      font-size: 23px;
    }
    .icon:hover {
      opacity: 1;
    }
    @media (min-width: 600px) {
      width: 563px;
      height: 45px;
      position: relative;
      .icon {
        color: black;
      }
    }
  `;