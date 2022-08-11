import React, { useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import {  useNavigate } from "react-router-dom";
import UserContext from "./Usecontext";


export default function TelaDelete() {

  const navigate = useNavigate();
  let token = localStorage.getItem("token")
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  console.log(token)
  function login() {
    const URL = "http://localhost:4000/session";
    const promise = axios.delete(URL, config);
    promise.then(response => {
     console.log("exclui")   
     navigate("/")
     
    })
    promise.catch(err => {
      alert("Insira dados válidos")
    });
  }



  return (
    <ContainerMaior>
      
        <Button onClick={login}>Log in</Button>
        
    </ContainerMaior>)
}

const ContainerMaior = styled.div`
display: flex;
`



const Button = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 24px;
margin-top: 24px;
width: 303px;
height: 45px;
background: #1877F2;
border-radius: 4.63636px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 20.976px;
line-height: 26px;
text-align: center;

color: #FFFFFF;
`

