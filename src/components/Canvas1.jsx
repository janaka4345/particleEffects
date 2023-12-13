import { useEffect, useMemo } from "react";
import useCanvas from "./useCanvas";
let ParticlesArray = [];
const particleCount = 20;
export default function Canvas1(props) {
  const canvasRef = useCanvas(draw);
  //created the particles
  ParticlesArray = useMemo(() => {
    console.log("memo ran");
    const ParticlesArray = [];
    for (let index = 0; index < particleCount; index++) {
      const particle = {
        x: Math.random() * 500,
        y: Math.random() * 250,
        radius: Math.floor((Math.random() + 1) * 5),
      };
      ParticlesArray.push(particle);
    }
    return ParticlesArray;
  }, []);

  useEffect(() => {
    // console.log(canvasRef.current);
  }, []);

  return (
    <>
      <canvas id="canvas1" ref={canvasRef}></canvas>
    </>
  );
}
const draw = (ctx, frameCount, ratio) => {
  ctx.clearRect(0, 0, ctx.canvas.width * ratio, ctx.canvas.height * ratio);
  /// hande the paticles
  ParticlesArray.forEach((particle, i) => {
    for (let index = i; index < ParticlesArray.length; index++) {
      if (
        Math.hypot(
          particle.x - ParticlesArray[index].x,
          particle.y - ParticlesArray[index].y,
        ) < 100
      ) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(ParticlesArray[index].x, ParticlesArray[index].y);
        ctx.stroke();
        ctx.strokeStyle = "#00ff00";
      }
    }
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
    ctx.fill();
  });
};
