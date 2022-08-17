import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";



export default function TelaDelete() {

  const [hashtags, setHashtags] = React.useState();
  
	useEffect(() => {
    const URL = "http://localhost:4001/hashtags";
    const promise = axios.get(URL);
    promise.then(response => {
    
      setHashtags(response.data)
      for (let index = 0; index < response.data.length; index++) {
       console.log(response.data[index].name)
      }
      response.data.map(hashtags => console.log("data", hashtags.name));
    })
    promise.catch(err => {
      alert("Data invalid")
    });
  }, []);


if (hashtags){
  return (
    <ContainerMaior>
      <Button >Log in</Button>
      <Tranding>
        <h1>trending</h1>
        <div>
        </div>
       <Hashtags>
       { hashtags.map(hashtags => <p key={hashtags.id}># {hashtags.name}</p>)}
       </Hashtags>
      </Tranding>
    </ContainerMaior>)
} else{ return (
  <ContainerMaior>
    <Button >Log in</Button>
    <Tranding>
      <h1>#</h1>
      <div>
      </div>
    </Tranding>
  </ContainerMaior>)}
}

const ContainerMaior = styled.div`
display: flex;
`
const Tranding = styled.div`

width: 301px;
height: 406px;
left: 877px;
top: 232px;

background: #171717;
border-radius: 16px;

div {

width: 300px;
height: 0px;
top: 22px;
border: 1px solid #484848;
}

h1 {
 
width: 127px;
height: 64px;

margin-left: 16px;
margin-top: 9px;
font-family: 'Oswald';
font-style: normal;
font-weight: 700;
font-size: 27px;
line-height: 40px;
color: #FFFFFF;
}
p {
  color: #FFFFFF;
  margin-left: 16px;
  
}
`
const Hashtags = styled.div`

`


const Button = styled.div`
display: flex;
justify-content: center;
align-items: center;

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

