import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { Button, Container, Typography } from "@mui/material";

const CameraApp = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);

    // Save the captured image to a file
    const blob = await fetch(imageSrc).then((res) => res.blob());
    const imageFile = new File([blob], "captured_image.jpg", {
      type: "image/jpg",
    });

    // Pass the captured image file to the YOLO detection function
    performDetection(imageFile);
  }, []);

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
      } else {
        // Handle the error response
        console.error("Error performing detection:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        MUI Camera App
      </Typography>
      <Webcam
        audio={false}
        height={400}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={600}
        style={{ borderRadius: "8px" }}
      />
      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={capture}>
          Capture
        </Button>
      </div>
      {capturedImage && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Captured Image
          </Typography>
          <img
            src={capturedImage}
            alt="captured"
            style={{ borderRadius: "8px" }}
          />
        </div>
      )}
    </Container>
  );
};

export default CameraApp;
