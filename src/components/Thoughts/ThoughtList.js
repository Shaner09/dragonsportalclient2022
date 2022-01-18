import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Modal,
  FormControl,
  ToggleButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getThoughts,
  get10Thoughts,
  invite,
  resetThoughts,
  deleteThought,
  editThought,
  setGhosting,
  setCommand,
} from "../../actions/useData";
import ReactScrollableFeed from "react-scrollable-feed";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "../LanguageSelector/LanguageSelect";

const ThoughtList = () => {
  let navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);
  const [checked, setChecked] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [thought, setThought] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showLS, setShowLS] = useState(false);
  const [bounce1, setBounce1] = useState(false);
  const [bounce2, setBounce2] = useState('start');

  const handleDelete1 = (id) => {
    setThought(id);
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDelete2 = () => {
    console.log("delete thought " + thought);
    dispatch(
      deleteThought({
        t_id: thought,
        u_id: state.user._id,
        g_id: state.group._id,
      })
    );
    setShowDeleteModal(!showDeleteModal);
  };

  const handleEdit1 = (id, message) => {
    setThought(id);
    setNewMessage(message);
    setShowEditModal(!showEditModal);
  };

  const handleEdit2 = () => {
    console.log("Edit thought " + thought);
    dispatch(
      editThought({
        t_id: thought,
        newTranslation: { language: state.user.language, message: newMessage },
        u_id: state.user._id,
      })
    );
    setShowEditModal(!showEditModal);
  };

  const loadMore = (count) => {
    let thoughtArray = state.group.thoughts;
    let newCount = count + 2;
    newCount = newCount > thoughtArray.length ? thoughtArray.length : newCount;
    setCounter(newCount);
    let newThoughts = thoughtArray.slice(
      thoughtArray.length - newCount,
      thoughtArray.length - count
    );
    dispatch(get10Thoughts(newThoughts));
  };

  const generateInvite = () => {
    dispatch(invite({ u_id: state.user._id, g_id: state.group._id }));
  };

  const toggleGhosting = (e) => {
    e.target.checked ? setShowLS(true) : dispatch(setGhosting(""));
  };

  const handleGet = () => {
    let getObject = { g_id: state.group._id, languages: [state.user.language] };
    if (state.ghosting) {
      getObject.languages.push(state.ghosting);
    }
    dispatch(getThoughts(getObject));
  };

  useEffect(() => {
    state.user._id === "" && navigate("/");
    dispatch(resetThoughts());
    //loadMore(counter)
    console.log(state.group._id);
    handleGet();
  }, []);

  useEffect(() => {
    state.command === "invite" && generateInvite();
    dispatch(setCommand(""));
  }, [state.command]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //These bounce functions are self-closing recursive functions. 
  //They will cause an error in the console when the page is changed, but functionality is unaffected.
  //This is bad code, but i think it will make our app look cooler in the demo if it auto-refreshes

  useEffect( async () => {
    await sleep(2500);
    console.log('bounce1')
    bounce2==="start" ? setBounce2(true) : setBounce2(!bounce2)
  }, [bounce1]);

  useEffect( async () => {
    if (bounce2!=="start") {
      handleGet()
      await sleep(2500);
      console.log('bounce2')
      setBounce1(!bounce1)
    }
  }, [bounce2]);

  return (
    <Container style={{height: "81vh"}}>
      <div style={{height: "7vh", display: "flex", flexDirection:"row", justifyContent:"center"}}>
      {/*<Button onClick={()=>{loadMore(counter)}}>Load 2 more</Button>*/}
      <Button onClick={generateInvite}>
        {state.interfaceStrings.getInviteCode}
      </Button>
      <ToggleButton
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={state.ghosting !== ""}
        onChange={(e) => toggleGhosting(e)}
      >
        {state.interfaceStrings.ghosting}
      </ToggleButton>
      <LanguageSelector
        page={"thoughts"}
        showLS={showLS}
        setShowLS={setShowLS}
      ></LanguageSelector>
      </div>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0px",
          height: "73vh",
        }}
      >
        <ReactScrollableFeed>
          {state.thoughts.length === 0 && state.interfaceStrings.noThoughts}
          {state.thoughts.map((thought, i) => (
            <Container
              style={{
                borderRadius: "10px",
                padding: "5px",
                margin: "10px 0px",
                background: "#D8D8D8",
              }}
              key={i}
            >
              <h3>{thought.creatorNickName}</h3>
              {thought.messages.map((message, i) => (
                <div key={i}>{message}</div>
              ))}
              <FaTrash
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete1(thought._id)}
              ></FaTrash>
              <FaPencilAlt
                style={{ cursor: "pointer" }}
                onClick={() => handleEdit1(thought._id, thought.message)}
              ></FaPencilAlt>
            </Container>
          ))}
        </ReactScrollableFeed>
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(!showDeleteModal)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>{state.interfaceStrings.deleteThought}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDelete2}>
              {state.interfaceStrings.yes}
            </Button>
            <Button variant="primary" onClick={handleDelete2}>
              {state.interfaceStrings.no}
            </Button>
            <Button
              variant="danger"
              onClick={() => setShowDeleteModal(!showDeleteModal)}
            >
              {state.interfaceStrings.no}
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showEditModal}
          onHide={() => setShowEditModal(!showEditModal)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
            {state.interfaceStrings.reviseMessage}:
            <FormControl
              required
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEdit2}>
              {state.interfaceStrings.send}
            </Button>
            <Button variant="primary" onClick={handleEdit2}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => setShowEditModal(!showEditModal)}
            >
              X
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
};
export default ThoughtList;
