import FilesetResolver from 

export const createHandLandmarker = async () => {

    const vision = await FilesetResolver.forVisionTasks(
        // path/to/wasm/root
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    const handLandmarker = await HandLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
            modelAssetPath: "hand_landmarker.task",
            delegate: "GPU",
            },
            numHands: 2
        }
    );
}