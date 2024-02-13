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
  accessKeyId: "YOUR_ACCESS_KEY",
  secretAccessKey: "YOUR_SECRET_KEY",
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
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const wrapperRef = useRef();

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

        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = handleDataAvailable;
        recorder.onstop = handleStop;

        setMediaRecorder(recorder);
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startCamera();
  }, []);

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
        if (!mediaRecorder) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: 720,
              height: 360,
            },
          });

          videoRef.current.srcObject = stream;

          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = handleDataAvailable;
          recorder.onstop = handleStop;

          setMediaRecorder(recorder);
        }

        mediaRecorder.start();
      } else {
        if (!mediaRecorder) return;

        mediaRecorder.stop();
        await new Promise((resolve) => (mediaRecorder.onstop = resolve));
      }

      setRecording((prevRecording) => !prevRecording);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
    }
  };

  const handleStop = () => {
    if (!mediaRecorder) return;

    const blob = new Blob(recordedChunks, { type: "video/webm" });
    setRecordedVideos((prevVideos) => [...prevVideos, URL.createObjectURL(blob)]);
    setRecordedChunks([]);
    setRecordCount(recordCount + 1);

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

  const handleUploadSelectedToCloud = async (index) => {
    const selectedVideo = recordedVideos[index];
  
    if (!selectedVideo) {
      console.error("Selected video not found");
      return;
    }
  
    const selectedBlob = await fetch(selectedVideo).then((response) => response.blob());
  
    const s3 = new AWS.S3();
  
    const params = {
      Bucket: "ivling-app",
      Key: `uploaded-video-${Date.now()}.webm`,
      Body: selectedBlob,
      ACL: "public-read",
      ContentType: "video/webm",
    };
  
    try {
      const result = await s3.upload(params).promise();
      console.log("Vídeo enviado para a nuvem com sucesso:", result.Location);
    } catch (error) {
      console.error("Erro ao enviar o vídeo para a nuvem:", error);
    }
  };

  useEffect(() => {
    if (recordedVideos.length > 2) {
      wrapperRef.current.style.overflowY = "scroll";
    } else {
      wrapperRef.current.style.overflowY = "hidden";
    }
  }, [recordedVideos]);

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
                <select
                  className="dropdown-words"
                  onChange={(e) => setWord(e.target.value)}
                >
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
              <button
                className="ivling-action-buttons"
                onClick={handleStop}
              >
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
      <div className="right-panel-wrapper" ref={wrapperRef} style={{ overflowY: recordedVideos.length > 2 ? 'scroll' : 'hidden' }}>
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
