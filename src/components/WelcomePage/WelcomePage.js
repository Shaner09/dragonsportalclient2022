import React, {useState, useEffect, useRef } from "react";
import { Button, Container, Form, InputGroup, Modal} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import image1 from "../WelcomePage/dragon.jpg";
import image2 from "../WelcomePage/family.jpg";
import LogInForm from "../LogInForm/LogInForm";
import Registration from "../Registration/Registration"
// import RegisterModal from "../LandingPage/RegisterModal";
import HomePage from "../HomePage/HomePage";
import { login, clearState } from "../../actions/useData";
import LanguageSelector from "../LanguageSelector/LanguageSelect";
import { useDispatch, useSelector } from "react-redux";
 
export default function WelcomePage () {
    const dispatch = useDispatch();
    //const [showModal, setShowModal] = useState(false)
    const state = useSelector((state) => state.state)
    const [token, setToken] = useState();
 
    //if(!token) {
        // return <login setToken={setToken} />
    //}
    useEffect(()=>{
        //makes it so the user is logged out if they back out to the welcome page.
        dispatch(clearState())
    },[])
   
return(
    <>
    <span
        className="title-name"
        style={{textAlign:"center", fontFamily:['Titillium Web:300,400,700', 'sans-serif']}}
    >
    {/* <h1>Dragon Family Software/ Development</h1>
   
    <h3>D.F.S./D.</h3> */}
    </span>
    <LanguageSelector page={'welcome'} showLS={false}></LanguageSelector>
    <Container className="images" style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
    <LogInForm/>
        <div><img className="dragon-image" src={image1}/></div>
        <Registration/>
    </Container>
    <Container className="images2">
        <img className="family-image" src={image2}/>
    </Container>
    <Container className="bottom" style={{textAlign:"center"}}>
    </Container>
    <Container style={{textAlign:"center"}}>
    </Container>
        <div className="centered" style={{textAlign:"center"}}>
            <h1>{state.interfaceStrings.welcome1}</h1>
            <h1>{state.interfaceStrings.welcome2}</h1>
            <h1>------------------------------------------</h1>
        </div>
    </>
    );
}
