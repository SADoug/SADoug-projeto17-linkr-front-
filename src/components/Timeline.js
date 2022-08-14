import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/Usercontext";
import { useContext } from "react";


export default function Timeline() {

  const { logo, setLogo } = useContext(UserContext);
  //imagem teste. deve-se usar, ao fim dos testes, o "logo" acima ao invés do "test" abaixo. para produção, deletar esse state "test"!
  const [test, setTest] = useState("https://yt3.ggpht.com/ytc/AKedOLQ6Ief26j8b1lgSA1OpXSCzJBlnlEEsWtQAfdwB=s900-c-k-c0x00ffffff-no-rj");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function publishPost() {
    const URL = "http://localhost:5000/posts";
    ;
    const promise = axios.post(URL, {
      message,
      link
    });
    promise.then(response => {
      const { data } = response;
      console.log(data);
    });
    promise.catch(err => {
      alert("Insira dados válidos")
    });
  }

  return (
    <FullScreen>
      <Header>
        <h1>Header here</h1>
      </Header>
      <Main>
        <h1>timeline</h1>

        <PublishPostBox>
        {/*Trocar src=test por src=logo!!! essa é uma imagem teste p/ não precisar passar por todo o signup/signin pra carregar uma img*/}
        <img src={test} alt="profile-picture" width="50" height="50"/>
          <Form>
            <h2>What are you going to share today?</h2>

            <Container>
              <input typeof="text" placeholder="http://" value={link} onChange={(e) => setLink(e.target.value)} />
              <input typeof="text" placeholder="Awesome article about #javascript" value={message} onChange={(e) => setMessage(e.target.value)} />
              <Button onClick={publishPost}>Publish</Button>
            </Container>
          </Form>
        </PublishPostBox>

      </Main>
    </FullScreen>
  )
}

const FullScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #333333;
  width: 100vw;
  height: 100vh;
`
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 502px;
  height: 100%;
  margin: 18px;

  h2 {
    font-size: 20px;
    font-weight: 300;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #707070;
  }
`

const PublishPostBox = styled.div`
  display: flex;
  background-color: #FFFFFF;
  width: 100%;
  height: 209px;
  margin-top: 43px;
  margin-bottom: 29px;
  border-radius: 16px;

  img {
    border-radius: 100%;
    margin-left: 18px;
    margin-top: 18px;
  }
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 611px;
  height: 100vh;
  margin-top: 78px;
  color: white;

  h1 {
    font-family: Oswald;
    font-size: 43px;
    font-weight: 700;
    line-height: 64px;
    letter-spacing: 0em;
    text-align: left;
  }
`

const Header = styled.div`
  width: 100vw;
  height: 72px;
  background-color: #151515;
  color: white;
`



const Container = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;


  input {
    width: 503px;
    height: 51px;
    background: #EFEFEF;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    margin-top: 5px;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color:#949494;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 102;
  height: 31px;
  background: #1877F2;
  border-radius: 4.63636px;
  margin-top: 5px;
  font-family: 'Oswald';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 20px;
  text-align: center;

  color: #FFFFFF;
`