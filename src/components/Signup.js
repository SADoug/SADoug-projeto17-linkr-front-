
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";


export default function SignupScreen() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");
    const [foto, setFoto] = useState("");
    const navigate = useNavigate();

    function cadastrar() {
        const URL = "https://linkr-projeto17.herokuapp.com/";
        ;
        const promise = axios.post(URL, {
            email: email,
            password: senha,
            username: username,
            profileImage: foto,
        });
        promise.then(response => {
            const { data } = response;
            console.log(data);
            navigate("/");
        });
        promise.catch(err => {alert("Insira dados válidos")
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
    </Authcontainer>
    <Container>
        <input typeof="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input typeof="text" placeholder="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <input typeof="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input typeof="text" placeholder="picture url" value={foto} onChange={(e) => setFoto(e.target.value)} />
            <Button onClick={cadastrar}>Sign Up</Button>
            
        <StyledLink to="/">Switch back to log in</StyledLink>
    </Container>
    </ContainerMaior>
    )
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
width: 37.2%;
padding: 31px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-color: #333333;


input {
    width: 299px;
height: 52px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
box-sizing: border-box;
border-radius: 5px;
margin-top: 16px;
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
width: 303px;
height: 45px;
background: #1877F2;
border-radius: 4.63636px;
margin-top: 24px;
margin-bottom: 24px;
font-family: 'Oswald';
font-style: normal;
font-weight: 400;
font-size: 20.976px;
line-height: 26px;
text-align: center;

color: #FFFFFF;
`
const StyledLink = styled(Link)`
  font-family: 'Oswald';
  height: 17px;
font-style: normal;
font-weight: 400;
font-size: 13.976px;
line-height: 17px;
text-align: center;
text-decoration-line: underline;
margin-top: 25px;
color: #FFFFFF;
`;
