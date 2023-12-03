import React, { useState, useEffect } from "react";
import "./index.css";
import { IconButton, Stack, Container } from "@mui/material";
import WebcamCapture from "./components/WebcamCapture";
import CapturedImage from "./components/CapturedImage";
import Footer from "./components/footer";
import Description from "./components/description";
import luckyCat from "../src/assets/luckyCat.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

// Require dotenv and configure it
require('dotenv').config();

// Access the environment variables
const baseUrl = process.env.REACT_APP_BASE_URL;

const CameraApp = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isDescription, setIsDescription] = useState(false);
  const [continueApp, setContinueApp] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  useEffect(() => {
    // Initialize speechSynthesis when the component mounts
    setSpeechSynthesis(window.speechSynthesis);
  }, []);

  const speakTotalValue = (totalValue) => {
    if (speechSynthesis && totalValue) {
      const utterance = new SpeechSynthesisUtterance(
        `Total value is ${totalValue}`
      );
      speechSynthesis.speak(utterance);
    }
  };

  const handleCapture = async (imageSrc) => {
    setCapturedImage(imageSrc);
    const blob = await fetch(imageSrc).then((res) => res.blob());
    const imageFile = new File([blob], "captured_image.jpg", {
      type: "image/jpg",
    });

    performDetection(imageFile);

    setTimeout(() => {
      setCapturedImage(null);
    }, 5000);
  };

  const performDetection = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const imageResponse = await fetch(
        `${baseUrl}get_image`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (imageResponse.ok) {
        const imageResult = await imageResponse.json();
        console.log("Image Detection Result:", imageResult);
        console.log(imageResult.total_value);

        // Speak the total value
        speakTotalValue(imageResult.total_value);

        setContinueApp(true);
      } else {
        console.error(
          "Error performing image detection:",
          imageResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  if (isDescription) {
    return (
      <div>
        <Description />
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
            width: "100%",
          }}
        >
          <img
            src={luckyCat}
            width={"50%"}
            style={{ maxWidth: "150px" }}
            alt="Lucky Cat"
          />
          <button
            className="button-52"
            style={{ marginTop: "10px" }}
            onClick={() => {
              setContinueApp(true);
              setIsDescription(false);
            }}
          >
            Try It Out!!
          </button>
        </Container>
        <Footer />
      </div>
    );
  }

  if (continueApp) {
    return (
      <div>
        <IconButton
          onClick={() => {
            setContinueApp(false);
            setCapturedImage(null);
          }}
          style={{ top: "20px", left: "20px", zIndex: 2, position: "absolute" }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowBackIcon style={{ color: "black" }} />
          </div>
        </IconButton>
        <div>
          <div className="captureWindow">
            <CapturedImage imageSrc={capturedImage} />
          </div>
          <div className="webcamWindow">
            <WebcamCapture onCapture={handleCapture} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex justify-center h-screen text-white " onClick={() => setContinueApp(true)}>
      <div className="flex flex-col justify-center align-middle">
        <div className="d-flex justify-center align-middle">
          <Stack spacing={2}>
          
            
              <p className="text-center"><PhotoCameraIcon style={{ fontSize: 90 }} /></p>
          
            <h3 className="text-lg font-semibold text-center">THBCurrencyCounter</h3>
            <p className="text-center">Click anywhere to process</p>
          </Stack>
        </div>
      </div>
      <InfoOutlinedIcon
        className="fixed top-4 right-4"
        fontSize="large"
        onClick={() => setIsDescription(true)}
      />
    </div>
  );
};

export default CameraApp;
