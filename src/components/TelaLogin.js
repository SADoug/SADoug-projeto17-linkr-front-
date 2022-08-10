import React from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./Usecontext";

export default function TelaLogin() {
  const [email, setEmail] = React.useState("opa@teste.com");
  const [senha, setSenha] = React.useState("12345678");
  const navigate = useNavigate();
  const { setToken, setDados, setLogo, setName } = useContext(UserContext);

  function login() {
    const URL = "http://localhost:4000/signin";

    const promise = axios.post(URL, {
      email, // email: email
      password: senha
    });
    promise.then(response => {
      const { data } = response;
      console.log(data);
      setToken(data.token)
      setLogo(data.profileImage)
      setName(data.name)
      navigate("/home")

    })
    promise.catch(err => {
      alert("Insira dados válidos")
    });
  }



  return (
    <ContainerMaior>
      <Authcontainer>
        <Logo>
          <h1>Linkr</h1>
          <span>
            save, share and discover <br /> the best links on the web
          </span>
        </Logo>
      </Authcontainer><Container>

        <input typeof="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input typeof="text" placeholder="Password" value={senha} onChange={(e) => setSenha(e.target.value)} />

        <Button onClick={login}>Log in</Button>
        <StyledLink to="/sign-up">First time? Create an account!</StyledLink>
      </Container>
    </ContainerMaior>)
}

const ContainerMaior = styled.div`
display: flex;
`
const Authcontainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 62.8%;
  height: 100vh;
  background-color: black;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  color: #fff;
  h1 {
    font-family: 'Oswald';
    font-weight: 700;
    font-size: 106px;
    letter-spacing: 0.05em;
  }
  span {
    font-family: 'Oswald';
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
  }

  @media (max-width: 500px) {
    width: 100vw;
    height: 26.3vh;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    text-align: center;
    h1 {
      font-size: 76px;
    }
    span {
      font-size: 23px;
      line-height: 34px;
    }
  }
`
const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

`

const Container = styled.div`
  min-height: 100vh;
  width: 37.8%;
  padding: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color:#333333 ;

  img {
      margin-bottom: 100px;
  }
input {
width: 303px;
height: 45px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
box-sizing: border-box;
border-radius: 5px;
margin-bottom: 16px;
font-family: 'Oswald';
font-style: normal;
font-weight: 700;
font-size: 27px;
line-height: 40px;
color:#9F9F9F;
}
`;

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
const StyledLink = styled(Link)`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  font-family: 'Roboto';
`;
