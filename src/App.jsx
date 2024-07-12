import { useEffect } from "react";
import { initCamera } from "./utils";

function App() {
  useEffect(() => {
    initCamera();
  }, []);
  return (
    <>
      <video autoPlay id="videoElement"></video>
      <canvas id="myCanvas"></canvas>
    </>
  );
}

export default App;
