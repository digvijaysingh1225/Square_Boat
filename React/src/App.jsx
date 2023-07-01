/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react'
import { DrawingUtils } from '@mediapipe/tasks-vision'
import { createHandLandmarker } from './handLandmarker'

const App = () => {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const inputVideoRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current;
    const videoRef = inputVideoRef.current;
    if (canvas) {
      contextRef.current = canvas.getContext('2d')
    }

    if (contextRef.current && canvas && videoRef) {
      createHandLandmarker().then((handLandmarker) => {
        console.log(handLandmarker)
        const DrawingUtils = new DrawingUtils(contextRef.current);
        let lastVideoTime = -1;
        let results = undefined;
        function predict() {  
          let startTimeMs = performance.now();
          if(lastVideoTime !== videoRef.currentTime) {
            lastVideoTime = videoRef.currentTime;
            results = handLandmarker.detectForVideo(videoRef, startTimeMs);
            console.log(results);
          }
          window.requestAnimationFrame(predict);
        }
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          videoRef.srcObject = stream;
          videoRef.addEventListener('loadeddata', predict);
        });
      });
    }
  }, []);
  return (
    <div style={{ position: 'relative' }}>
      <video
        id='webcam'
        style={{ position: 'absolute' }}
        autoPlay
        playsInline
        ref={inputVideoRef}
      >
      </video>
      <canvas
        ref={canvasRef}
        id='output_canvas'
        style={{
          position: 'absolute',
          left: '0px',
          top: '0px',
        }}
      >
      </canvas>
    </div>
  )
}

export default App