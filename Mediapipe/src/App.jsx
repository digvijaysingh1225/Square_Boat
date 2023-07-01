import { useEffect, useRef } from 'react'
import { DrawingUtils, HandLandmarker } from '@mediapipe/tasks-vision'
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
        const drawingUtils = new DrawingUtils(contextRef.current);
        let lastVideoTime = -1;
        let results = undefined;
        function predict() {  
          canvas.style.width = videoRef.videoWidth;
          canvas.style.height = videoRef.videoHeight;
          canvas.width = videoRef.videoWidth;
          canvas.height = videoRef.videoHeight;
          let startTimeMs = performance.now();
          if(lastVideoTime !== videoRef.currentTime) {
            lastVideoTime = videoRef.currentTime;
            results = handLandmarker.detectForVideo(videoRef, startTimeMs);
            console.log(results);
          }
          contextRef.current.save();
          contextRef.current.clearRect(0, 0, canvas.width, canvas.height);  
          if(results.landmarks)
          {
            for(const landmarks of results.landmarks)
            {
              drawingUtils.drawConnectors(
                landmarks,
                HandLandmarker.HAND_CONNECTIONS,
                {
                  color: '#FF000',
                  landWidth: 2,
                }
              );
              drawingUtils.drawLandmarks(landmarks, {
                color: "#FF000",
                lineWidth: 2,
              })
            }
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
        style={{ position: 'relative' }}
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


