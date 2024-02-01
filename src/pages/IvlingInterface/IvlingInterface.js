import React, { useState, useRef, useEffect } from "react";
import AWS from 'aws-sdk';
import "./IvlingInterface.css";

AWS.config.update({
  accessKeyId: 'AKIATCKANLG73OHPY6XR',
  secretAccessKey: '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',
  region: 'eu-north-1 (Europe (Stockholm))',
});

const IvlingInterface = () => {
  const [word, setWord] = useState("");
  const [recordCount, setRecordCount] = useState(0);
  const [recordedVideos, setRecordedVideos] = useState([]);
  const [recording, setRecording] = useState(false);
  const [selectedThumbnails, setSelectedThumbnails] = useState([]);
  const videoRef = useRef();

  let mediaRecorder;
  let recordedChunks = [];

  const uploadToS3 = async (videoBlob, fileName) => {
    const s3 = new AWS.S3();

    const params = {
      Bucket: 'ivling-app',
      Key: fileName,
      Body: videoBlob,
      ACL: 'public-read',
      ContentType: 'video/webm',
    };

    try {
      const result = await s3.upload(params).promise();
      console.log('Vídeo enviado com sucesso:', result.Location);
    } catch (error) {
      console.error('Erro ao enviar o vídeo:', error);
    }
  };

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

    // Enviar o vídeo para o Amazon S3
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
    const filteredVideos = recordedVideos.filter((_, index) => !selectedThumbnails[index]);
    setRecordedVideos(filteredVideos);
    setSelectedThumbnails([]);
  };

  const handleUploadSelectedToCloud = () => {
    // Implementar lógica para enviar os vídeos selecionados para a nuvem
  };

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

  return (
    <div className="ivling-interface">
      <div className="left-panel-wrapper">
        <div className="white-rectangle">
          <div className="rounded-corners">
            <video ref={videoRef} autoPlay playsInline muted />
          </div>
          <div className="dropdown-and-buttons">
            <select onChange={(e) => setWord(e.target.value)}>
              <option value="word1">Palavra 1</option>
              <option value="word2">Palavra 2</option>
            </select>
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
                <button onClick={() => handleDeleteSelected(index)}>Eliminar</button>
                <button onClick={() => handleUploadSelectedToCloud(index)}>
                  Carregar na Cloud
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
