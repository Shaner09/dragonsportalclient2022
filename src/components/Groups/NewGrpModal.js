import React, { useState, useEffect } from "react";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
//import { createTestGrp } from "../../actions/useData";
import { useDispatch, useSelector } from "react-redux";
import { createGrp } from "../../actions/useData";
const NewGrpModal = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);

  const [showModal, setShowModal] = useState(false);
  const [grpData, setGrpData] = useState({
    thoughts: "",
    participants: "",
    title: "",
    creator: "",
  });
    
 
  return (
    <span>
      <InputGroup.Text
        style={{ cursor: "pointer", height: "7vh" }}
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        <FaPlus></FaPlus>
      </InputGroup.Text>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(!showModal);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h3>{state.interfaceStrings.createGroup}</h3>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder={state.interfaceStrings.title}
            required
            value={grpData.title}
            onChange={(e) =>
              setGrpData({ ...grpData, title: e.target.value })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={async () => {
              let results = await dispatch(createGrp({ u_id: state.user._id, title:grpData.title  }));
              results && navigate("/thoughts");
            }}
          >
            {state.interfaceStrings.enter}
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
};
export default NewGrpModal;