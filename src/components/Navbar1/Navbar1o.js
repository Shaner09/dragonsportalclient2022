import React, { useEffect, useState } from "react";
import { Container, Button, Modal, FormControl, ToggleButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleGhost} from "../../actions/useData";
import {useNavigate} from 'react-router-dom'

const Navbar1 = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state)

  return (
    <Container style={{border:'2px solid red'}}>{state.interfaceStrings.welcome} {state.user.nickname}
        <Button onClick={()=>navigate('/user')}>{state.interfaceStrings.userPage}</Button>
    </Container>
  );
};
export default Navbar1;
