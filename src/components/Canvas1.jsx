import useCanvas from "./useCanvas";

export default function Canvas1(props) {
  console.log("renderedcanvas1");

  const draw = (ctx, frameCount, ratio) => {
    ctx.clearRect(0, 0, ctx.canvas.width * ratio, ctx.canvas.height * ratio);
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };
  const canvasRef = useCanvas(draw);

  return (
    <>
      <canvas id="canvas1" ref={canvasRef}></canvas>
    </>
  );
}
