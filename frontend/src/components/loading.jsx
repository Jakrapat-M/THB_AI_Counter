import { Box, Container } from '@mui/material';
import React from 'react';
import baht from '../assets/baht.png';
import '../styleFiles/loading.css'; // Import the CSS file for styling

const loading = () => {
  return (
    
      <Container style={{backgroundColor: "#98fa98", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <img className="coinAnimate" src={baht} alt="Loading" style={{position: "absolute", width: '100%', maxWidth:'200px', zIndex: 3}}/>
        <Box className="textAnimate1" backgroundColor={"#af3535"} 
        borderRadius={"30px"} 
        width={"50%"} maxWidth={"200px"} height={"fit-content"} marginTop={5} >
          <h1 style={{color: "#ffa2a2", zIndex: 2, 
          fontFamily: 'cursive', textAlign: "center", 
          marginTop: 0, marginBottom: 0}}> CherryTHB </h1>
        </Box>
        <h2 className="textAnimateSub" 
        style={{color: "#af3535", fontSize:"15px", 
        fontFamily: 'cursive', zIndex: 1, opacity: 0, 
        marginTop:"20px"}}>
          <span>By Cherry🍒</span>
        </h2>
      </Container>
    
  );
};


export default loading;
