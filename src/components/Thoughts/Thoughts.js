import React from "react";
import { Container } from "react-bootstrap" 
import ThoughtCreator from "./ThoughtCreator";
import ThoughtList from "./ThoughtList";

const Thoughts = () => {

    return (
    <Container style={{display:'flex', flexDirection:"column", alignItems:"center", padding:"0px", height: "90vh"}}>
        <ThoughtList></ThoughtList>
        <ThoughtCreator></ThoughtCreator>
    </Container>
    );
}
export default Thoughts