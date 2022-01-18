import React, { useEffect } from "react";
import LanguageSelector from "./components/LanguageSelector/LanguageSelect";
import WelcomePage from "./components/WelcomePage/WelcomePage";
// import Translator from "./components/Translator/Translator";
import Thoughts from "./components/Thoughts/Thoughts";
import Navbar1 from "./components/Navbar1/Navbar1";
import Groups from "./components/Groups/Groups";
import User from "./components/User/User";
import STT from "./components/STT/STT";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

const App = () => {
  const state = useSelector((state) => state.state);

  useEffect(() => {
    console.log("changed state");
  }, [state]);

  return (
    <Router>
      <div style={{height:window.location.pathname!=="/" && '100vh', minHeight:"100vh"}}>
      <Navbar1 />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/homePage" element={<homePage />} />
        {/* <Route path='/landingPage' element={<LandingPage/>}/> */}
        <Route path="/groups" element={<Groups />} />
        <Route path="/thoughts" element={<Thoughts />} />
        <Route path="/user" element={<User />} />
        <Route path="/languages" element={<LanguageSelector />} />
        {/* <Route path='/translator' element={<Translator/>}/> */}
        <Route path="/stt" element={<STT />} />
        <Route path="*" element={<div>error</div>} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
