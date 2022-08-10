import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./Usecontext";
import TelaCadastro from "./TelaCadastro";
import TelaLogin from "./TelaLogin";
import TelaDelete from "./DeleteTest";

function App() {
  
  const [token, setToken] = useState("");
  const [dados, setDados] = useState("");
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");

  return (
    <UserContext.Provider value={{ token, setToken, dados, setDados, logo, setLogo, name, setName }}>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<TelaLogin />} />
            <Route path="/sign-up" element={<TelaCadastro />} />
            <Route path="/home" element={<TelaDelete />} />
        </Routes>
    </BrowserRouter>
</UserContext.Provider>
  )
}

export default App;