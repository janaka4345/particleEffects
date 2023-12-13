import { useEffect, useMemo, useRef } from "react";
import useCanvas from "./useCanvas";
const particleCount = 20;
export default function Canvas1() {
  const particleArrayRef = useRef([]);
  const mousePosition = useRef({ x: undefined, y: undefined });
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
  }, [particleArrayRef]);

  function draw(ctx, frameCount, ratio) {
    // console.log(ctx);
    ctx.clearRect(0, 0, ctx.canvas.width * ratio, ctx.canvas.height * ratio);
    ///mousePosition
    // ctx.fillStyle = "#00ff00";
    // ctx.beginPath();
    // ctx.arc(
    //   mousePosition.current.x,
    //   mousePosition.current.y,
    //   40,
    //   0,
    //   2 * Math.PI,
    // );
    // ctx.fill();
    /// hande the paticles
    particleArrayRef.current.forEach((particle, i) => {
      let force = 0;
      const dx = mousePosition.current.x - particle.x;
      const dy = mousePosition.current.y - particle.y;
      const distance = Math.hypot(dy, dx);
      const angle = Math.atan2(particle.y, particle.x);
      distance < 50 ? (force = 3) : null;
      ctx.fillStyle = "#ff0000";
      ctx.beginPath();
      ctx.arc(
        (particle.x += particle.speedX + force),
        (particle.y += particle.speedY + force),
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

      // for (let index = i; index < particleArrayRef.current.length; index++) {
    });
  }
  function handleClick(e) {
    mousePosition.current.x = e.clientX;
    mousePosition.current.y = e.clientY;
  }
  return (
    <>
      <canvas id="canvas1" ref={canvasRef} onClick={handleClick}></canvas>
    </>
  );
}
