import React from "react";
import { Box } from "@mui/material";
import cloud from "../assets/PinkCloudShape.png";
import baht from "../assets/baht.png";
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
        position="relative"
        src={cloud}
        className="Cloud"
        style={{ zIndex: 1, alignItems: "center", objectPosition: "center" }}
      />
      <img
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
      />
      <span className="Description">
        &nbsp;&nbsp;&nbsp;SNAP!📷 Introducing{" "}
        <strong style={{ color: "white", fontStyle: "italic", padding: 0, margin: 0 }}>
          CherryTHB
        </strong>
        &nbsp;, your currency AI detector that not only captures the bills&coins
        but calculates it too! Effortlessly identify with a snap!
      </span>
    </Box>
  );
};

export default Description;
