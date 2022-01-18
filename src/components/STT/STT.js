import React, { useState, useEffect, useRef } from "react";
import { Button, Container, FormControl, ToggleButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { createGrp, joinGrp, setCommand, setStateMessage } from "../../actions/useData";

let STT = (props) => {
  let location = useLocation();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let state = useSelector((state) => state.state);
  let [change, setChange] = useState(0);
  let [buttonOn, setIsButtonOn] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const [recordMessage, _setRecordMessage] = React.useState(false);
  const [gCommand, _setgCommand] = React.useState("terminate");
  const [texts, _setTexts] = React.useState("");
  const [texts2, _setTexts2] = React.useState(state.message);
  const [page, _setPage] = React.useState(location.pathname);

  const recordMessageRef = React.useRef(recordMessage);
  const setRecordMessage = (data) => {
    recordMessageRef.current = data;
    _setRecordMessage(data);
  };
  const gCommandRef = React.useRef(gCommand);
  const setgCommand = (data) => {
    gCommandRef.current = data;
    _setgCommand(data);
  };
  const textsRef = React.useRef(texts);
  const setTexts = (data) => {
    textsRef.current = data;
    _setTexts(data);
  };
  const texts2Ref = React.useRef(texts2);
  const setTexts2 = (data) => {
    texts2Ref.current = data;
    _setTexts2(data);
  };
  const pageRef = React.useRef(page);
  const setPage = (data) => {
    pageRef.current = data;
    _setPage(data);
  };

  const functions = ['portal message']

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition;

  const plzWork = () => {
    recognition = new window.SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener("result", (e) => {
      let text = Array.from(e.results).map((result) => result[0]).map((result) => result.transcript).join("");
      if (textsRef.current.includes("portal text")) {
        setRecordMessage(true)
      } 
      if (gCommandRef.current !== "terminate" && text){
        setTexts(text);
      }
    });

    recognition.addEventListener("end", () => {
      if (textsRef.current.includes('portal state')) {
        dispatch(setCommand('state'))
      } else if (textsRef.current.includes('portal my groups')) {
        navigate("/groups");
      } else if (textsRef.current.includes('portal user page')) {
        navigate("/user");
      } else if (textsRef.current.includes('portal change language')) {
        let newCommand = "portal change language" + '-x9-' + textsRef.current.split('portal change language')[1].trim()
        console.log(newCommand)
        dispatch(setCommand(newCommand))
      } else if (pageRef.current==='/thoughts') {
        textsRef.current.includes('portal text') && setTexts(textsRef.current.split('portal text')[1])
        if (recordMessageRef.current && textsRef.current!=='') {
          let string = texts2Ref.current +' ' + textsRef.current
          string=string.trim()
          setTexts2(string)
          dispatch(setStateMessage(texts2Ref.current))
          console.log('set to :' + texts2Ref.current)
          if (texts2Ref.current.includes('portal send')) {
            setTexts2(texts2Ref.current.split('portal send')[0])
            dispatch(setStateMessage(texts2Ref.current))
            setRecordMessage(false)
            console.log('send message: '+ texts2Ref.current)
            dispatch(setCommand('send'))
            setTexts2('')
            dispatch(setStateMessage(''))
          }
        } else {
          if (textsRef.current.includes('portal get invite code')) {
            console.log('invite')
            dispatch(setCommand('invite'))
          } else if (textsRef.current.includes('portal ghost')) {
            let newCommand = "portal ghost" + '-x9-' + textsRef.current.split('portal ghost')[1].trim()
            console.log(newCommand)
            dispatch(setCommand(newCommand))
          }
        }
      } else if (pageRef.current==='/groups') {
        if (textsRef.current.includes('portal open')) {
          let newCommand = "portal open" + '-x9-' + textsRef.current.split('portal open')[1].trim()
          dispatch(setCommand(newCommand))
        } else if (textsRef.current.includes('portal leave')) {
          let newCommand = "portal leave" + '-x9-' + textsRef.current.split('portal leave')[1].trim()
          dispatch(setCommand(newCommand))
        } else if (textsRef.current.includes('portal create group')) {
          let newCommand = "portal create group" + '-x9-' + textsRef.current.split('portal create group')[1].trim()
          dispatch(setCommand(newCommand))
        }
      } else if (pageRef.current==='/user') {
        if (textsRef.current.includes('portal create group')) {
          let newCommand = "portal create group" + '-x9-' + textsRef.current.split('portal create group')[1].trim()
          dispatch(setCommand(newCommand))
        } else if (textsRef.current.includes('portal change password')) {
          dispatch(setCommand('portal change password'))
        }
      }

      setTexts('')
      if (gCommandRef.current !== "terminate") {
        console.log("portal listening");
        recognition.start();
      } else {
        console.log("portal no longer listening");
      }
    });

    recognition.start();
  };

  useEffect(()=>{
    setTexts('')
    setTexts2('')
    dispatch(setStateMessage(''))
    setPage(location.pathname)
  },[location.pathname])
  // this should be done in the restart button.

  const handleButtonClick = () => {
    if (gCommandRef.current === "terminate") {
      setgCommand("run");
      plzWork();
    } else {
      setRecordMessage(false)
      setgCommand("terminate");
    }
  };

  return (
    <span>
      <ToggleButton
        id="toggle-check2"
        type="checkbox"
        variant="outline-primary"
        checked={gCommand!=='terminate'}
        onClick={()=>handleButtonClick()}
        style={{marginRight:"2vw", color:"white", border:"1px solid white"}}
      >STT</ToggleButton>
    </span>
  );
};
export default STT;
