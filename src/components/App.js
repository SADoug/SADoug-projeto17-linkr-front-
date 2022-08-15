import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components';
import { useState } from "react";
import UserContext from "../contexts/Usercontext";
import SignupScreen from "./Signup";
import SigninScreen from "./Login";
import Timeline from "./Timeline";
import UserTimelineScreen from './UserTimelineScreen'

function App() {

  const [token, setToken] = useState("");
  const [userImage, setUserImage] = useState("");
  const [data, setData] = useState("");
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");


  return (
    <UserContext.Provider value={{  token, setToken, userImage, setUserImage, data, setData, logo, setLogo, name, setName }}>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SigninScreen />} />
            <Route path="/sign-up" element={<SignupScreen />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/user/:id" element ={<UserTimelineScreen />}></Route>
        </Routes>
    </BrowserRouter>
    <AppContainer/>
</UserContext.Provider>
  )
}

export default App;


const AppContainer = styled.main`
  @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Oswald:wght@200;300;400;500;600;700&family=Passion+One:wght@400;700;900&display=swap');
  --darker-grey: #151515;
  --lighter-grey: #333333;
  --title-font: 'Passion One', cursive;
  --subtitle-font: 'Oswald', sans-serif;
  --default-font: 'Lato', sans-serif;
  --line-grey: #484848;
  font-family: var(--default-font);
  background-color: var(--lighter-grey);
  height: 100vh;
`