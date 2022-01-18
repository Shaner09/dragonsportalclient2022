import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Modal,
  FormControl,
  ToggleButton,
  Dropdown,
  Navbar,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCommand, toggleGhost } from "../../actions/useData";
import { useNavigate, useLocation } from "react-router-dom";
import STT from "../STT/STT";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Navbar1 = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);
  const openGrp = () => {
    navigate("/groups");
  };

  useEffect(() => {
    state.command === "state" && console.log(state);
    dispatch(setCommand(""));
  }, [state.command]);

  return (
    location.pathname !== "/" && (
      <div
        style={{
          background: "#355e3b",
          color: "white",
          height: "10vh",
          padding: "2vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        bg="header"
        expand="lg"
      >
        {location.pathname === "/user" ? (
          <div
            style={{
              height: "7vh",
              width: "7vh",
              textAlign: "center",
              fontSize: "3.8vh",
            }}
            className="navButton"
            onClick={openGrp}
          >
            <FaArrowRight />
          </div>
        ) : location.pathname === "/groups" ? (
          <div
            style={{
              height: "7vh",
              width: "7vh",
              textAlign: "center",
              fontSize: "3.8vh",
            }}
            onClick={() => navigate("/user")}
          >
            <FaArrowLeft />
          </div>
        ) : (
          <div
            style={{
              height: "7vh",
              width: "7vh",
              textAlign: "center",
              fontSize: "3.8vh",
            }}
            onClick={() => navigate("/groups")}
          >
            <FaArrowLeft />
          </div>
        )}
        <h3
          style={{
            color: "white",
            textAlign: "center",
            maxWidth: "55vw",
            maxHeight: "7vh",
          }}
        >
          {location.pathname === "/thoughts"
            ? state.group.title
            : state.interfaceStrings.welcome + " " + state.user.nickname}
        </h3>
        <STT></STT>
        {/*<Container className="NavContain" style={{backgroundColor: '#355e3b', color: "white", height: "10vh" }}>
        <h2>
          {location.pathname === "/thoughts" ? state.group.title : state.interfaceStrings.welcome + " " + state.user.nickname}
        </h2>
        <div className="NavButtonsArea">
          <div className="NavUserBtnArea">
            <STT></STT>
          </div>
          <div className="NavUserBtnArea">
            <Button className="navButton" onClick={() => navigate("/user")}>
              {state.interfaceStrings.userPage}
            </Button>
          </div>
          <div className="NavMyGroupsBtn">
            <Button onClick={openGrp}>{state.interfaceStrings.myGroups}</Button>
          </div>
        </div>
        <Dropdown style={{marginRight:'5px'}}>
    <Dropdown.Toggle style={{color:'white', background:'#355e3b', border:'none'}}>
    Pages
  </Dropdown.Toggle>
    <Dropdown.Menu>
    </Dropdown.Menu>
    </Dropdown>
      </Container>*/}
      </div>
    )
  );
};
export default Navbar1;
