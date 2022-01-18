import React from 'react';
import { Button, Dropdown, Container } from "react-bootstrap";
 
const HomePage =()=>{
  const toolBarItems = ['Read Conversations', 'Create New Conversation', 'Create Post']
 
  return(
        <>
        <Container style={{textAlign:'center'}}>
        <Container >
          <h1>Welcome... Hello GRACE</h1>
        </Container>
        <Button style={{color:'white', background:'black'}} >Log Out</Button>
                                                                  {/*onClick={ logOut()} */}
        <p>What would you like to do?</p>
        <Button>Invite New Friends</Button>
        <Button>Search Friends List</Button>
       
      <Dropdown style={{marginRight:'5px'}}>
      <Dropdown.Toggle style={{color:'white', background:'gray', border:'none', textAlign: 'center'}}>
                    Group Tool Bar
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {toolBarItems.map((challenge,i)=><Dropdown.Item key={i} >{challenge}</Dropdown.Item>)}
              {/* onClick={()=>setDisplayedComponent(challenge)} */}
      </Dropdown.Menu>
      </Dropdown>
      </Container>
     
      </>
    )
}
 
export default HomePage;

