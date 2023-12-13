import { useEffect, useMemo, useRef } from "react";
import useCanvas from "./useCanvas";
const particleCount = 20;
export default function Canvas1() {
  const particleArrayRef = useRef([]);
  const canvasRef = useCanvas(draw);
  //created the particles
  particleArrayRef.current = useMemo(() => {
    console.log("memo ran");
    const ParticlesArray = [];
    for (let index = 0; index < particleCount; index++) {
      const particle = {
        x: Math.random() * 500,
        y: Math.random() * 250,
        radius: Math.floor((Math.random() + 1) * 5),
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
      };
      ParticlesArray.push(particle);
    }
    return ParticlesArray;
  }, []);

  function draw(ctx, frameCount, ratio) {
    // console.log(ctx);
    ctx.clearRect(0, 0, ctx.canvas.width * ratio, ctx.canvas.height * ratio);
    /// hande the paticles
    particleArrayRef.current.forEach((particle, i) => {
      ctx.fillStyle = "#ff0000";
      ctx.beginPath();
      ctx.arc(
        (particle.x += particle.speedX),
        (particle.y += particle.speedY),
        particle.radius,
        0,
        2 * Math.PI,
      );
      ctx.fill();
      particle.x < 0 || particle.x > ctx.canvas.width
        ? (particle.speedX *= -1)
        : null;
      particle.y < 0 || particle.y > ctx.canvas.height
        ? (particle.speedY *= -1)
        : null;
    });
  }

  return (
    <>
      <canvas id="canvas1" ref={canvasRef}></canvas>
    </>
  );
}
