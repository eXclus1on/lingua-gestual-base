// IvlingInterface.js
import React, { useState, useRef, useEffect } from "react";
import "./IvlingInterface.css";

const IvlingInterface = () => {
  const [word, setWord] = useState("");
  const [recordCount, setRecordCount] = useState(0);
  const [recordedVideos, setRecordedVideos] = useState([]);
  const [recording, setRecording] = useState(false);
  const videoRef = useRef();

  let mediaRecorder;
  let recordedChunks = [];

  useEffect(() => {
    const adjustCameraSize = () => {
      const aspectRatio = 1280 / 1024;
      const newHeight = Math.floor(videoRef.current.offsetWidth / aspectRatio);
      videoRef.current.style.width = "100%";
      videoRef.current.style.height = `${newHeight}px`;
    };

    window.addEventListener("resize", adjustCameraSize);
    adjustCameraSize();

    return () => {
      window.removeEventListener("resize", adjustCameraSize);
    };
  }, []);

  const toggleRecording = async () => {
    try {
      if (!recording) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 1280,
            height: 1024,
          },
        });
        videoRef.current.srcObject = stream;

        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.onstop = handleStop;

        mediaRecorder.start();
      } else {
        mediaRecorder.stop();
      }

      setRecording((prevRecording) => !prevRecording);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  const handleStop = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    setRecordedVideos([...recordedVideos, URL.createObjectURL(blob)]);
    recordedChunks = [];
    setRecordCount(recordCount + 1);
  };

  const handleDeleteVideo = () => {
    setRecordedVideos([]);
  };

  const handleUploadToCloud = () => {};

  return (
    <div className="ivling-interface">
      <div className="left-panel-wrapper">
        <div className="white-rectangle">
          <video ref={videoRef} autoPlay playsInline muted />
          <select onChange={(e) => setWord(e.target.value)}>
            <option value="word1">Palavra 1</option>
            <option value="word2">Palavra 2</option>
          </select>
          <p>Contagem de Gravação: {recordCount}</p>
          <div className="button-container">
            <button onClick={toggleRecording}>
              {recording ? "Parar Gravação" : "Gravar"}
            </button>
            <button>Play</button>
            <button onClick={handleStop}>Aprovar</button>
            <button onClick={handleDeleteVideo}>Eliminar</button>
          </div>
        </div>
      </div>
      <div className="right-panel-wrapper">
        <div className="white-rectangle thumbnails-container">
          {recordedVideos.map((video, index) => (
            <div key={index} className="video-thumbnail">
              <video src={video} controls width="360" height="270" />
              <button className="delete-button" onClick={handleDeleteVideo}>
                Eliminar
              </button>
            </div>
          ))}
          <button className="upload-button" onClick={handleUploadToCloud}>
            Carregar na Cloud
          </button>
        </div>
      </div>
    </div>
  );
};

export default IvlingInterface;
