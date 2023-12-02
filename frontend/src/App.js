import React, { useState, useEffect } from "react";
import "./index.css";
import { IconButton, Stack } from "@mui/material";
import WebcamCapture from "./components/WebcamCapture";
import CapturedImage from "./components/CapturedImage";
// import Loading from "./components/loading";
// import Footer from "./components/footer";
// import Description from "./components/description";
// import luckyCat from "../src/assets/luckyCat.png";
import baht from "../src/assets/baht.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { blue } from "@mui/material/colors";
// import { Height } from "@mui/icons-material";

const CameraApp = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [continueApp, setContinueApp] = useState(false); // Add continueApp state

  // Loading Screen Timer logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500); // Change this to control the duration of the loading screen

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  const handleCapture = async (imageSrc) => {
    setCapturedImage(imageSrc);
    // Add your image processing logic here
    // Save the captured image to a file
    const blob = await fetch(imageSrc).then((res) => res.blob());
    const imageFile = new File([blob], "captured_image.jpg", {
      type: "image/jpg",
    });

    // Pass the captured image file to the YOLO detection function
    performDetection(imageFile);

    // Set imageSrc to null after capturing the image
    setTimeout(() => {
      setCapturedImage(null);
    }, 5000); // Change the duration as needed
  };

  const performDetection = async (imageFile) => {
    // Create a FormData object to send the file as a multipart/form-data
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      // Make a POST request to the Flask server
      const response = await fetch("http://127.0.0.1:5000/get_image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle the response from the server (e.g., display results)
        const result = await response.json();
        console.log("Detection Result:", result);
        setContinueApp(true); // Set continueApp to true after successful detection
      } else {
        // Handle the error response
        console.error("Error performing detection:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  //Load screen
  if (isLoading) {
    // return <Loading />;
  }

  if (continueApp) {
    // Render the app if continueApp is true
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
    <div className="container flex justify-center h-screen text-white">
      <div className="flex flex-col justify-center align-middle">
        <div className="d-flex justify-center align-middle">
          <Stack spacing={2}>
            <img src={baht} alt="logo" className="w-40 h-40" />
            <h3 className="text-lg font-semibold">THBCurrencyCouter</h3>
            <button
              className="text-lg px-5 py-2 rounded-full transition ease-in-out delay-150 bg-indigo-500  hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300"
              onClick={() => setContinueApp(true)}
            >
              SNAP
            </button>
          </Stack>
        </div>
      </div>
    </div>

    // <div className="App">
    //   <Description />
    //   <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "10px", width: "100%" }}>
    //     <img src={luckyCat} width={"50%"} style={{ maxWidth: "150px" }} alt="Lucky Cat" /> */}
    //    <button className="button-52" style={{ marginTop: "10px" }} onClick={() => setContinueApp(true)}>Try It Out!!</button>

    //   </Container>
    //   <Footer />
    // </div>
  );
};

export default CameraApp;
