import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";
import {
  setBrowserLanguage,
  changeUserLanguage,
  setGhosting,
  setCommand,
} from "../../actions/useData";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import languageInfo from "../../languageInfo";

const LanguageSelector = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);

  const [showModal, setShowModal] = useState(false);
  const [displayArray, setDisplayArray] = useState(languageInfo);

  const filterLanguages = (text) => {
    setDisplayArray(
      languageInfo.filter(
        (item) =>
          item[2].toLowerCase().includes(text.toLowerCase()) ||
          item[0].toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleClick = (languageCode, language, interfaceObject) => {
    props.page !== "thoughts"
      ? dispatch(setBrowserLanguage({ languageCode: languageCode }))
      : dispatch(setGhosting(languageCode));
    if (props.page === "user") {
      dispatch(
        changeUserLanguage({
          u_id: state.user._id,
          userPutter: { language: languageCode },
        })
      );
    }
    props.page !== "thoughts"
      ? setShowModal(!showModal)
      : props.setShowLS(false);
  };

  useEffect(() => {
    if (state.command.includes("portal ghost")) {
      let searchString = state.command.split("-x9-")[1].toLowerCase();
      let language1 = languageInfo.filter((language2) =>
        searchString.includes(language2[0].toLowerCase().split("-").join(" "))
      )[0];
      if (language1 !== undefined) {
        dispatch(setGhosting(language1[1]));
      } else {
        dispatch(setGhosting(""));
      }
    } else if (state.command.includes("portal change language")) {
      let searchString = state.command.split("-x9-")[1].toLowerCase();
      let language1 = languageInfo.filter((language2) =>
        searchString.includes(language2[0].toLowerCase().split("-").join(" "))
      )[0];
      if (language1 !== undefined) {
        dispatch(setBrowserLanguage({ languageCode: language1[1] }));
        dispatch(
          changeUserLanguage({
            u_id: state.user._id,
            userPutter: { language: language1[1] },
          })
        );
      }
    }
    dispatch(setCommand(""));
  }, [state.command]);

  return (
    <span>
      {props.page !== "thoughts" && (
        <Button onClick={() => setShowModal(!showModal)}>
          <img className="flagImg" src={state.browserFlag} alt=""></img>
          {state.browserLanguage}
        </Button>
      )}
      <Modal
        show={props.page === "thoughts" ? props.showLS : showModal}
        onHide={() => setShowModal(!showModal)}
        size="xl"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          closeButton
          style={{ background: "beige" }}
          onClick={() => props.page === "thoughts" && props.setShowLS(false)}
        ></Modal.Header>
        <div
          style={{
            textAlign: "center",
            height: "50px",
            marginTop: "-50px",
            fontSize: "30px",
            marginRight: "40px",
            marginLeft: "40px",
          }}
        >
          <b>{state.browserLanguage}</b>
        </div>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0px",
          }}
        >
          <InputGroup className="mb-3" style={{ maxWidth: "300px" }}>
            <FormControl
              name="creator"
              onChange={(e) => filterLanguages(e.target.value)}
            />
            <InputGroup.Text>
              <FaSearch></FaSearch>
            </InputGroup.Text>
          </InputGroup>
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {displayArray.map((pair, i) => (
              <div
                style={{
                  cursor: "pointer",
                  border: "3px solid gray",
                  background: "beige",
                  width: "200px",
                  margin: "5px",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
                key={i}
                onClick={() => handleClick(pair[1], pair[2], pair[3])}
              >
                {pair[2]}, {pair[0]},
                <img className="flagImg" src={pair[4]} alt=""></img>
              </div>
            ))}
          </Container>
        </Container>
      </Modal>
    </span>
  );
};
export default LanguageSelector;
