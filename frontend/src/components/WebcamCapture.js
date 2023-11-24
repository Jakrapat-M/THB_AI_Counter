import React, { useRef, useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "../styleFiles/webcam.css"

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user");

  useEffect(() => {
    const handleResize = () => {
      const newFacingMode = window.innerWidth < 768 ? { exact: "environment" } : "user";
      setFacingMode(newFacingMode);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  }, [onCapture]);

  return (
    <div style={{ display: "flex", flexDirection: 'column', height: "100vh" }}>
      <Webcam
        videoConstraints={facingMode}
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam"
        style={{ zIndex: 1 }}
      />
      <Button className="webcam-button" onClick={capture}>
        <div class="photo-button">
          <div class="circle">
            <FontAwesomeIcon className="icon" icon={faCamera} />
          </div>
          <div class="ring"></div>
        </div>
      </Button>
    </div>
  );
};

export default WebcamCapture;