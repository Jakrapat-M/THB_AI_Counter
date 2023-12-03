import React from "react";
import { Box } from "@mui/material";
import cloud from "../assets/PinkCloudShape.png";
// import baht from "../assets/baht.png";
import "../styleFiles/description.css";

const Description = () => {

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      marginTop={"20px"}
    >
      <img
        alt="cloud"
        position="relative"
        src={cloud}
        className="Cloud"
        style={{ zIndex: 1, alignItems: "center", objectPosition: "center" }}
      />
      {/* <img
        alt="baht"
        position="relative"
        src={baht}
        width={"80px"}
        style={{
          zIndex: 2,
          position: "absolute",
          top: "10%",
          left: "50%",
          paddingBottom: "30px",
          transform: "translate(-50%, -50%)",
        }}
      /> */}
      <span className="Description">
        <strong style={{ color: "white", fontStyle: "italic", padding: 0, margin: 0 }}>
          THBCurrencyCounter
        </strong>
        &nbsp;, your currency AI detector that not only captures bills and coins
        but calculates it too! Effortlessly identify with a snap!
      </span>
    </Box>
  
  );
};

export default Description;
