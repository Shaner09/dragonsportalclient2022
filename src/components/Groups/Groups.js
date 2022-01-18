import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {
  Button,
  Container,
  InputGroup,
  FormControl,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ReactScrollableFeed from "react-scrollable-feed";
import { FaTrash } from "react-icons/fa";
import { getGrps, createTestGrp, setGrp, leaveGroup, setCommand, createGrp } from "../../actions/useData";
import NewGrpModal from "./NewGrpModal";
import LanguageSelector from "../LanguageSelector/LanguageSelect";
const Groups = () => {
  let navigate = useNavigate()
  const [groupSearchText, setGroupSearchText] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);
  
  let levi = true;
  const handleDelete = (g_id) => {
    console.log(`delete group ${g_id}`);
    dispatch(leaveGroup({g_id: g_id, u_id: state.user._id}))
  };
  useEffect(() => {
    state.user._id==='' && navigate('/')
  }, []);
  useEffect(async () => {
    if (state.command.includes("portal open")) {
      let searchString = state.command.split('-x9-')[1].toLowerCase()
      let group = state.groups.filter(group=>searchString.includes(group.title.toLowerCase()))[0]
      if (group!==undefined) { 
        dispatch(setGrp(group))
        navigate('/thoughts')
      }
    } else if (state.command.includes("portal leave")) {
      console.log(state.command)
      let searchString = state.command.split('-x9-')[1].toLowerCase()
      let group = state.groups.filter(group=>searchString.includes(group.title.toLowerCase()))[0]
      if (group!==undefined) { 
        dispatch(leaveGroup({g_id: group._id, u_id: state.user._id}))
      }
    } else if (state.command.includes("portal create group")) {
      console.log(state.command)
      let newTitle = state.command.split('-x9-')[1].toLowerCase()
      if (newTitle?.length>3) {
        let results = await dispatch(createGrp({ u_id: state.user._id, title: newTitle }));
        results && navigate("/thoughts");
      }
    }
    dispatch(setCommand(''))
  }, [state.command]);
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0px",
        height: "90vh",
      }}
    >
      <LanguageSelector page={"thoughts"} ></LanguageSelector>
      <div className="styles_scrollable-div__prSCv" style={{height: "81vh"}}>
        <div>
          {state.groups
            .filter((group) =>
              group.title
                .toLowerCase()
                .includes(groupSearchText.toLowerCase())
            )
            .map((group, i) => (
              <Container
                style={{
                  borderRadius: "10px",
                  padding: "5px",
                  margin: "10px 0px",
                  background: "#D8D8D8",
                }}
                key={i}
                onClick={(e) => {
                  e.preventDefault()
                  if (levi) {
                    dispatch(setGrp(group))
                    navigate('/thoughts')
                  } else {
                    levi = true;
                  }
                }}
              >
                <h3>{group.title}</h3>
                <FaTrash
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleDelete(group._id);
                    levi = false;
                  }}
                ></FaTrash>
              </Container>
            ))}
        </div>
      </div>
      <Container style={{ display: "flex", padding: "0px", height: "7vh"}}>
        <FormControl
          placeholder={state.interfaceStrings.searchForGroup}
          value={groupSearchText}
          onChange={(e) => setGroupSearchText(e.target.value)}
        />
        <NewGrpModal></NewGrpModal>
      </Container>
    </Container>
  );
};
export default Groups;