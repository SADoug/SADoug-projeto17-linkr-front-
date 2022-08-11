import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./Usecontext";
import SignupScreen from "./Signup";
import SigninScreen from "./Login";
import TelaDelete from "./DeleteTest";
import Timeline from "./Timeline";

function App() {
  
  const [token, setToken] = useState("");
  const [data, setData] = useState("");
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");

  return (
    <UserContext.Provider value={{ token, setToken, data, setData, logo, setLogo, name, setName }}>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SigninScreen />} />
            <Route path="/sign-up" element={<SignupScreen />} />
            <Route path="/timeline" element={<Timeline />} />
        </Routes>
    </BrowserRouter>
</UserContext.Provider>
  )
}

export default App;