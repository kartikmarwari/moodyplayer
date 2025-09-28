import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from "axios";
 
export default function FacialExpression({ setSongs }) {
  const videoRef = useRef();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [mood, setMood] = useState(""); // optional: show detected mood

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Error accessing webcam: ", err));
    };

    loadModels().then(startVideo);
  }, []);

  const detectMood = async () => {
    if (!modelsLoaded || !videoRef.current) return;

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      setMood("No face detected");
      return;
    }

    const expressions = detections[0].expressions;
    let mostProbableExpression = 0;
    let expressionName = "";

    for (const [expression, probability] of Object.entries(expressions)) {
      if (probability > mostProbableExpression) {
        mostProbableExpression = probability;
        expressionName = expression;
      }
    }

    setMood(expressionName); // update detected mood

    axios.get(`http://localhost:3000/songs?mood=${expressionName}`)
      .then(response => {
        console.log(response.data);
        if (response.data.song) setSongs(response.data.song);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="flex flex-col items-center space-y-6 bg-gray-50 p-6 rounded-2xl shadow-xl max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">Mood Detector</h2>

      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full h-[420px] rounded-xl border-4 border-gray-300 shadow-lg object-cover"
      />

      {mood && (
        <p className="text-lg text-gray-700 font-medium">
          Detected Mood: <span className="text-indigo-600">{mood}</span>
        </p>
      )}

      <button
        onClick={detectMood}
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition duration-300"
      >
        Detect Mood
      </button>
    </div>
  );
}
