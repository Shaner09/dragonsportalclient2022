import React, { useState, useEffect } from "react";
import { Button, Container, FormControl} from "react-bootstrap";
import ChangePasswordModal from "./ChangePasswordModal";
import LanguageSelector from "../LanguageSelector/LanguageSelect"
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { createGrp, joinGrp } from "../../actions/useData";

const User = () => {
    const [title,setTitle] = useState('')
    const [code,setCode] = useState('')
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const state = useSelector((state) => state.state)

    const openGrp = () => {
        navigate('/groups')
    }
    const handleCreateGrp = () => {
        dispatch(createGrp({u_id:state.user._id, title:title}))
    }

    const handleJoinGrp = () => {
        dispatch(joinGrp({u_id: state.user._id, fullCode: code}))
    }

    useEffect(() => {
        state.user._id==='' && navigate('/')
    }, []);

    return (
      <Container>
          <Button onClick={()=>console.log(state)}>Log State</Button>
          <h2>Profile Info:</h2>
          <div>{state.interfaceStrings.fullName}: {state.user.fullName}</div>
          <div>{state.interfaceStrings.nickname}: {state.user.nickname}</div>
          <div><LanguageSelector page={'user'} showLS={false}></LanguageSelector></div>
          <ChangePasswordModal></ChangePasswordModal>
          <Button onClick={openGrp}>{state.interfaceStrings.myGroups}</Button>
          <FormControl  
            required
            placeholder={state.interfaceStrings.title}
            value={title}
            onChange={(e) =>
                setTitle(e.target.value)
            }/>
            <Button onClick={handleCreateGrp}>{state.interfaceStrings.createGroup}</Button>
            <FormControl  
            required
            placeholder={state.interfaceStrings.inviteCode}
            value={code}
            onChange={(e) =>
                setCode(e.target.value)
            }/>
            <Button onClick={handleJoinGrp}>{state.interfaceStrings.joinGroup}</Button>

      </Container>
    );
}
export default User