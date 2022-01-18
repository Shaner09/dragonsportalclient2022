import React, {useState, useEffect} from "react";
import { Button, Modal, FormControl} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, setCommand } from "../../actions/useData";

const ChangePasswordModal = (props) => {
    const [showModal, setShowModal] = useState(false);
    const state = useSelector((state) => state.state)
    const dispatch = useDispatch()

    const [data, setData] = useState({password:'',newPassword:'',newPassword2:'',u_id:state.user._id})

    const handleChangePassword = () => {
      dispatch(changePassword(data))
      setShowModal(!showModal)
      //possibly throw a new modal with an update on how the request went
    }

    useEffect( async ()=>{
      if (state.command.includes("portal change password")) {
        console.log(state.command)
        setShowModal(!showModal)
      }
      dispatch(setCommand(''))
    },[state.command])

    return (
      <span>
      <Button onClick={()=>setShowModal(!showModal)}>{state.interfaceStrings.changePassword}</Button>
      <Modal
          show={showModal}
          onHide={()=>setShowModal(!showModal)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <h3>{state.interfaceStrings.changePassword}</h3>
          </Modal.Header>
          <Modal.Body>
          <FormControl  
            required
            placeholder={state.interfaceStrings.currentPassword}
            value={data.password}
            onChange={(e) =>
                setData({...data ,password: e.target.value})
            }/>
          <FormControl  
            required
            placeholder={state.interfaceStrings.newPassword}
            value={state.newPassword}
            onChange={(e) =>
              setData({...data,newPassword:e.target.value})
            }/>
            <FormControl  
            required
            placeholder={state.interfaceStrings.confirmNewPassword}
            value={state.newPassword2}
            onChange={(e) =>
              setData({...data, newPassword2: e.target.value})
            }/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleChangePassword}>{state.interfaceStrings.changePassword}</Button>
          </Modal.Footer>
        </Modal>
        </span>
    );
}
export default ChangePasswordModal

