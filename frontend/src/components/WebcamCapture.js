import React, { useRef, useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "../styleFiles/webcam.css"
import PhotoCamera from "@mui/icons-material/PhotoCamera";

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
        style={{ margin: window.innerWidth < 900 ? "0" : "0 auto" }}
      />
      <div className="fixed bottom-5 left-0 right-0 flex justify-center">
        <button className="w-16 h-16 rounded-full bg-indigo-500 z-0" onClick={capture}> 
        <PhotoCamera style={{fontSize:25 , color:"white"}}></PhotoCamera>
        </button>
      </div>
      {/* <Button className="webcam-button" style={{zIndex:2}} onClick={capture}>
        <div class="photo-button">
          <div class="circle">
            <FontAwesomeIcon className="icon" icon={faCamera} />
          </div>
          <div class="ring"/>
        </div>
      </Button> */}
    </div>
  );
};

export default WebcamCapture;