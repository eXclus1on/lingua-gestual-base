import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './RecordVideo.css';

const RecordVideo = () => {
  const webcamRef = useRef(null);
  const videoRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const startRecording = () => {
    const stream = webcamRef.current.video.srcObject;
    const options = { mimeType: 'video/webm' };
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

mediaRecorder.onstop = () => {
  const blob = new Blob(recordedChunks, { type: 'video/webm' });
  const videoUrl = URL.createObjectURL(blob);
  // Exibir o vídeo no player de vídeo
  videoRef.current.src = videoUrl;
};


    setMediaRecorder(mediaRecorder);
    setIsRecording(true);
    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="camera-wrapper">
      <div className="camera-square">
        <Webcam ref={webcamRef} />
      </div>

      <div className="video-player">
        <video ref={videoRef} controls />
      </div>

      {isRecording ? (
        <button className="button-stop" onClick={stopRecording}>
          Parar Gravação
        </button>
      ) : (
        <button className="button-start" onClick={startRecording}>
          Iniciar Gravação
        </button>
      )}
    </div>
  );
};

export default RecordVideo;
