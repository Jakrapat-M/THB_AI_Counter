import React, { useRef, useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "../styleFiles/webcam.css"

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user");
  // const facingMode = {facingMode: {exact: "environment"}};

  useEffect(() => {
    const handleResize = () => {
      const newFacingMode = window.innerWidth < 900 ? {facingMode: {exact: "environment"}} : {facingMode: "user"};
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
    <div className="flex flex-col sm:flex-row">
      <Webcam
        videoConstraints={facingMode}
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam"
        style={{ zIndex: 1, margin: window.innerWidth < 900 ? "0" : "0 auto" }}
      />
      <Button className="webcam-button" style={{zIndex:2}} onClick={capture}>
        <div class="photo-button">
          <div class="circle">
            <FontAwesomeIcon className="icon" icon={faCamera} />
          </div>
          <div class="ring"/>
        </div>
      </Button>
    </div>
  );
};

export default WebcamCapture;