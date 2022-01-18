import React, {useEffect, useState} from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createThought, setCommand, setStateMessage } from '../../actions/useData'
import { FaPaperPlane } from "react-icons/fa";

const ThoughtCreator = () => {
  const state = useSelector((state) => state.state)
  const dispatch = useDispatch()

  const handleSubmit = () => {
      //e.preventDefault()
      const thoughtCreatorObject = {g_id: state.group._id, languages: [state.user.language], thought: {translations: [{ language: state.user.language, message: state.message}], creator: state.user._id, creatorNickName: state.user.nickname}}
      if (state.ghosting) {
        thoughtCreatorObject.languages.push(state.ghosting)
      }
      dispatch(createThought(thoughtCreatorObject))
      console.log(`make thought: (${state.message})  by: ${state.user._id}`)
      dispatch(setStateMessage(''))
  }

  useEffect(()=>{
    state.command==="send" && handleSubmit()
    dispatch(setCommand(''))
  },[state.command])

    return (
      <Container style={{display:'flex', padding:"0px", height:"7vh"}}>
        <FormControl  
        name="message"
        required
        value={state.message}
        onChange={(e) =>
          dispatch(setStateMessage(e.target.value))
        }/>
        <InputGroup.Text onClick={handleSubmit} style={{cursor:"pointer"}}>
          <FaPaperPlane></FaPaperPlane>
        </InputGroup.Text>
      </Container>
    );
}
export default ThoughtCreator