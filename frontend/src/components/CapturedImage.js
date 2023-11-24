import React from "react";
import { Typography } from "@mui/material";

const CapturedImage = ({ imageSrc }) => {
  return (
    imageSrc && (
      <div style={{ marginTop: "20px" }}>
        <img
          src={imageSrc}
          alt="captured"
          style={{ borderRadius: "8px", zIndex: 1 }}
        />
        <Typography variant="h6" style={{ textAlign: "center",color:"white", fontSize:"150%" }}>
          Captured Image
        </Typography>
      </div>
    )
  );
};

export default CapturedImage;