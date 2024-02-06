// src/IvlingInterface.js
import React, { useState, useRef, useEffect } from "react";
import AWS from "aws-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStop,
  faPlay,
  faTrash,
  faCloudUploadAlt,
  faCheck,
  faTrashAlt,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import fakeWords from "./fakeData";
import "./IvlingInterface.css";

AWS.config.update({
  accessKeyId: "AKIATCKANLG73OHPY6XR",
  secretAccessKey: "4Rcgi2d/awXLFuNzEA3TDaveKORpi0g8AD5QM+3m",
  region: "eu-north-1",
});

const IvlingInterface = () => {
  const [word, setWord] = useState("");
  const [recordCount, setRecordCount] = useState(0);
  const [recordedVideos, setRecordedVideos] = useState([]);
  const [recording, setRecording] = useState(false);
  const [selectedThumbnails, setSelectedThumbnails] = useState([]);
  const videoRef = useRef();
  const [wordCounts, setWordCounts] = useState({});

  let mediaRecorder;
  let recordedChunks = [];

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 720,
            height: 360,
          },
        });

        videoRef.current.srcObject = stream;

        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.onstop = handleStop;
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startCamera();
  }, []);

  const uploadToS3 = async (videoBlob, fileName) => {
    const s3 = new AWS.S3();

    const params = {
      Bucket: "ivling-app",
      Key: fileName,
      Body: videoBlob,
      ACL: "public-read",
      ContentType: "video/webm",
    };

    try {
      const result = await s3.upload(params).promise();
      console.log("Vídeo enviado com sucesso:", result.Location);
    } catch (error) {
      console.error("Erro ao enviar o vídeo:", error);
    }
  };

  const toggleRecording = async () => {
    try {
      if (!recording) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 720,
            height: 360,
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

    // Atualizar o contador da palavra
    setWordCounts((prevWordCounts) => {
      const updatedCounts = { ...prevWordCounts };
      updatedCounts[word] = (updatedCounts[word] || 0) + 1;
      return updatedCounts;
    });

    uploadToS3(blob, `video-${recordCount}.webm`);
  };

  const handleDeleteVideo = () => {
    setRecordedVideos([]);
  };

  const handleThumbnailCheckboxChange = (index) => {
    setSelectedThumbnails((prevSelected) => {
      const updatedSelection = [...prevSelected];
      updatedSelection[index] = !updatedSelection[index];
      return updatedSelection;
    });
  };

  const handleDeleteSelected = () => {
    const filteredVideos = recordedVideos.filter(
      (_, index) => !selectedThumbnails[index]
    );
    setRecordedVideos(filteredVideos);
    setSelectedThumbnails([]);
  };

  const handleUploadSelectedToCloud = () => {
    // Implementar lógica para enviar os vídeos selecionados para a nuvem
  };

  useEffect(() => {
    const adjustCameraSize = () => {
      const aspectRatio = 720 / 360;
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

  return (
    <div className="ivling-interface">
      <div className="left-panel-wrapper">
        <div className="white-rectangle">
          <div>
            <video ref={videoRef} autoPlay playsInline muted />
          </div>
          <div className="dropdown-and-buttons">
          <div className="dropdown-container">
  <div className="word-count-box">
    <span className="word-count">({wordCounts[word] || 0})</span>
  </div>
  <div className="dropdown">
    <select className="dropdown-words" onChange={(e) => setWord(e.target.value)}>
      {fakeWords.map((fakeWord, index) => (
        <option key={index} value={fakeWord}>
          {fakeWord}
        </option>
      ))}
    </select>
  </div>
</div>
            <div className="button-container">
              <button
                className="ivling-action-buttons"
                onClick={toggleRecording}
              >
                <FontAwesomeIcon icon={recording ? faStop : faCircle} />
                {recording ? "" : ""}
              </button>
              <button className="ivling-action-buttons">
                <FontAwesomeIcon icon={faPlay} />
              </button>
              <button className="ivling-action-buttons" onClick={handleStop}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button
                className="ivling-action-buttons"
                onClick={handleDeleteVideo}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="right-panel-wrapper">
        <div className="white-rectangle thumbnails-container">
          {recordedVideos.map((video, index) => (
            <div key={index} className="video-thumbnail">
              <video src={video} controls width="360" height="270" />
              <div className="thumbnail-actions">
                <input
                  type="checkbox"
                  checked={selectedThumbnails[index] || false}
                  onChange={() => handleThumbnailCheckboxChange(index)}
                />
                <button onClick={() => handleDeleteSelected(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button onClick={() => handleUploadSelectedToCloud(index)}>
                  <FontAwesomeIcon icon={faCloudUploadAlt} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IvlingInterface;
