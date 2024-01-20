import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import logo from "../../images/ivling.png";
import "./RecordVideo.css";

const RecordVideo = () => {
  const webcamRef = useRef(null);
  const [recording, setRecording] = useState(false);
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
      // Faça algo com a URL do vídeo, como exibi-la em um player de vídeo
      console.log('Video URL:', videoUrl);
    };

    setMediaRecorder(mediaRecorder);
    setRecording(true);
    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <Webcam ref={webcamRef} />

      {recording ? (
        <button onClick={stopRecording}>Parar Gravação</button>
      ) : (
        <button onClick={startRecording}>Iniciar Gravação</button>
      )}
    </div>
  );
};

export default RecordVideo;
