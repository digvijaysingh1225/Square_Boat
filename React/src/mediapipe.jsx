import { useEffect, useRef } from 'react'
import { createHandLandmarker } from './handLandmarker';

const App = () => {
  const canvasRef=useRef(null);
  const contextRef=useRef(null);
  const inputVideoRef=useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const videoRef = inputVideoRef.current;
    
    if(canvas){
        contextRef.current = canvas.getContext("2d");
    }

    if(contextRef.current && canvas && videoRef){
        createHandLandmarker().then()
    }
  })
  return (
    <div style={{ position: 'relative' }}>
      <video
        id='webcam'
        style={{ position: 'absolute' }}
        autoPlay
        playsInline
        ref={inputVideoRef}
      />
      <canvas
        ref={canvasRef}
        id='output_canvas'
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      >
      </canvas>
    </div>
  )
}

export default App