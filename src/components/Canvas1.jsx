import { useEffect, useMemo } from "react";
import useCanvas from "./useCanvas";
let ParticlesArray = [];
export default function Canvas1(props) {
  ParticlesArray = useMemo(() => {
    const ParticlesArray = [];
    for (let index = 0; index < 100; index++) {
      const particle = {
        x: Math.random() * 500,
        y: Math.random() * 250,
        size: Math.floor((Math.random() + 1) * 10),
      };
      ParticlesArray.push(particle);
    }
    return ParticlesArray;
  }, []);

  useEffect(() => {
    console.log(ParticlesArray);
  }, []);

  const canvasRef = useCanvas(draw);

  return (
    <>
      <canvas id="canvas1" ref={canvasRef}></canvas>
    </>
  );
}
const draw = (ctx, frameCount, ratio) => {
  ctx.clearRect(0, 0, ctx.canvas.width * ratio, ctx.canvas.height * ratio);
  ParticlesArray.forEach((particle) => {
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(
      particle.x,
      particle.y,
      particle.size * Math.sin(frameCount * 0.05) ** 2,
      0,
      2 * Math.PI,
    );
    ctx.fill();
  });
};
