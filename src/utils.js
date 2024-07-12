import * as bodySegmentation from "@tensorflow-models/body-segmentation";

export const initCamera = async () => {
  const videoElement = document.getElementById("videoElement");
  const canvas = document.getElementById("myCanvas");
  // videoElement.style.display = "none";

  const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
  const segmenterConfig = {
    runtime: "mediapipe",
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation",
    modelType: "general",
  };

  const segmenter = await bodySegmentation.createSegmenter(
    model,
    segmenterConfig
  );

  await navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      videoElement.srcObject = stream;

      const foregroundThreshold = 0.5;
      const edgeBlurAmount = 15;
      const flipHorizontal = false;
      // const context = canvas.getContext("2d");
      const blurAmount = 5;

      const processFrame = async () => {
        // Draw the video frame on the canvas
        // context.drawImage(videoElement, 0, 0, 640, 480);

        // Apply the background blur effect
        await bodySegmentation.drawBokehEffect(
          canvas,
          videoElement,
          await segmenter.segmentPeople(videoElement),
          foregroundThreshold,
          blurAmount,
          edgeBlurAmount,
          flipHorizontal
        );

        requestAnimationFrame(processFrame);
      };

      setTimeout(() => requestAnimationFrame(processFrame), 1000);
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });
};
