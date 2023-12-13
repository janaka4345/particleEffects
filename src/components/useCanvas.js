import { useRef, useEffect } from "react";

const useCanvas = (draw) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("usecanvas effect ran");
    const canvas = canvasRef.current;
    const handleResize = () => {
      canvas.width = 500;
      canvas.height = 250;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const { devicePixelRatio: ratio = 1 } = window;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      // console.log(frameCount);
      frameCount++;
      draw(context, frameCount, ratio);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [draw]);

  return canvasRef;
};
export default useCanvas;
