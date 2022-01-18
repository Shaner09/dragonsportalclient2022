import React, {useState} from "react";
import { Button, Modal, FormControl, Form} from "react-bootstrap";
import { register } from "../../actions/useData";
import { useDispatch, useSelector } from "react-redux";
 
const Registration = (props) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.state)

    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [data, setData] = useState({nickname:'',language:'',firstName:'',lastName:'',password:'',verifyPassword:''})
 
    const handleRegister = async () => {
      if (data.password===data.verifyPassword) {
        const results = await dispatch(register({...data,language: state.browserLanguageCode}))
        results? setMessage(`${state.interfaceStrings.user} "${results.nickname}" ${state.interfaceStrings.created}`) : setMessage(state.interfaceStrings.registerUnsuccessful)
      } else {
        setMessage(state.interfaceStrings.passError1)
      }
      setShowModal(!showModal)
    }
 
    return (
      <span>
      <Button style={{width:"86px"}} onClick={()=>setShowModal(!showModal)}>{state.interfaceStrings.register}</Button>
      <Modal
          show={showModal}
          onHide={()=>setShowModal(!showModal)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <h3>{state.interfaceStrings.register}</h3>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>
            {state.interfaceStrings.firstName}:
            </Form.Label>
            <FormControl  
              required
              //placeholder={'firstName'}
              value={data.firstName}
              onChange={(e) =>
                  setData({...data,firstName:e.target.value})
              }/>
              <Form.Label>
              {state.interfaceStrings.lastName}:
            </Form.Label>
            <FormControl  
              required
              //placeholder={'lastName'}
              value={data.lastName}
              onChange={(e) =>
                  setData({...data,lastName:e.target.value})
              }/>
              <Form.Label>
              {state.interfaceStrings.nickname}:
            </Form.Label>
          <FormControl  
            required
            //placeholder={'username'}
            value={data.nickname}
            onChange={(e) =>
                setData({...data,nickname:e.target.value})
            }/>
            <Form.Label>
            {state.interfaceStrings.password}:
            </Form.Label>
          <FormControl  
            required
            //placeholder={'password'}
            value={data.password}
            onChange={(e) =>
                setData({...data,password:e.target.value})
            }/>
            <Form.Label>
            {state.interfaceStrings.verifyPassword}:
            </Form.Label>
          <FormControl  
            required
            //placeholder={'verifyPassword'}
            value={data.verifyPassword}
            onChange={(e) =>
                setData({...data,verifyPassword:e.target.value})
            }/>
            {/* <Form.Label>
              Email:
            </Form.Label>
          <FormControl  
            required
            placeholder={'email'}
            value={email.password}
            onChange={(e) =>
                setData({...data,email:e.target.value})
            }/> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleRegister}>{state.interfaceStrings.register}</Button>
          </Modal.Footer>
        </Modal>
        {message}
        </span>
    );
}
export default Registration;
