import React, { useState, useEffect } from "react";
import { Button, Container, FormControl } from "react-bootstrap";
import ChangePasswordModal from "./ChangePasswordModal";
import LanguageSelector from "../LanguageSelector/LanguageSelect";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGrp, joinGrp, setCommand } from "../../actions/useData";

const User = () => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const state = useSelector((state) => state.state);

  const openGrp = () => {
    navigate("/groups");
  };
  const handleCreateGrp = async () => {
    let results = await dispatch(createGrp({ u_id: state.user._id, title: title }));
    results && navigate("/thoughts");
  };

  const handleJoinGrp = async () => {
    let results = await dispatch(joinGrp({ u_id: state.user._id, fullCode: code }));
    results && navigate("/thoughts");
  };

  useEffect(() => {
    state.user._id === "" && navigate("/");
  }, []);

  useEffect( async ()=>{
    if (state.command.includes("portal create group")) {
      console.log(state.command)
      let newTitle = state.command.split('-x9-')[1].toLowerCase()
      if (newTitle?.length>3) {
        let results = await dispatch(createGrp({ u_id: state.user._id, title: newTitle }));
        results && navigate("/thoughts");
      }
    }
    dispatch(setCommand(''))
  },[state.command])

  return (
    <Container style={{height:"90vh"}} >
      <div className="profileArea">
        <h2>{state.interfaceStrings.user}:</h2>
        <div className="fullname">
          {state.interfaceStrings.fullName}: {state.user.fullName}
        </div>
        <div className="nickname">
          {state.interfaceStrings.nickname}: {state.user.nickname}
        </div>
      </div>
      <div className="languageSelector">
      {state.interfaceStrings.language}:
        <LanguageSelector page={"user"} showLS={false}></LanguageSelector>
      </div>
      <div className="ChgPswd">
        <ChangePasswordModal></ChangePasswordModal>
      </div>
      <div className="myGroups">
        <Button onClick={openGrp}>{state.interfaceStrings.myGroups}</Button>
      </div>
      <div className="createArea">
        <FormControl
          required
          placeholder={state.interfaceStrings.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={handleCreateGrp}>
          {state.interfaceStrings.createGroup}
        </Button>
      </div>
      <div className="joinArea">
        <FormControl
          required
          placeholder={state.interfaceStrings.inviteCode}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button onClick={handleJoinGrp}>
          {state.interfaceStrings.joinGroup}
        </Button>
      </div>
    </Container>
  );
};
export default User;