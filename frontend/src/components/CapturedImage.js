import React from "react";
import { Typography } from "@mui/material";

const CapturedImage = ({ imageSrc }) => {
  return (
    imageSrc && (
      <div className="pt-5 h-screen w-fit md:w-1/2 flex flex-col justify-center items-center">
        <img
          src={imageSrc}
          alt="captured"
          style={{ borderRadius: "8px", zIndex: 1 }}
        />
        <Typography variant="h6" style={{ textAlign: "center", color: "white", fontSize: "150%" }}>
          Captured Image
        </Typography>
      </div>
    )
  );
};

export default CapturedImage;