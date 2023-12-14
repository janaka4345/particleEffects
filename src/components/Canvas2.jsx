import { useEffect, useMemo, useRef } from "react";
import useCanvas from "./useCanvas";
const particleCount = 100;
export default function Canvas2() {
  const particleArrayRef = useRef([]);
  const mousePosition = useRef({ x: undefined, y: undefined });
  const canvasRef = useCanvas(drawCallback);

  drawParticles(particleArrayRef);
  function handleMouseDown(e) {
    mousePosition.current.x = e.clientX;
    mousePosition.current.y = e.clientY;
  }
  function handlemouseUp() {
    mousePosition.current.x = undefined;
    mousePosition.current.y = undefined;
  }
  function drawCallback(ctx, frameCount, ratio) {
    draw(ctx, frameCount, ratio, particleArrayRef, mousePosition);
  }
  return (
    <>
      <canvas
        id="canvas1"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handlemouseUp}
      ></canvas>
    </>
  );
}

function draw(ctx, frameCount, ratio, particleArrayRef, mousePosition) {
  clearCanvas(ctx, ratio);
  updateParticles(particleArrayRef, ctx, mousePosition);
}

function clearCanvas(ctx, ratio) {
  ctx.clearRect(0, 0, ctx.canvas.width * ratio, ctx.canvas.height * ratio);
}

function drawParticles(particleArrayRef) {
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
}

function updateParticles(particleArrayRef, ctx, mousePosition) {
  particleArrayRef.current.forEach((particle, i) => {
    // console.log(mousePosition.current)
    let angle = 0;
    let radius = 100;
    if (mousePosition.current.x != undefined) {
      const dx = mousePosition.current.x - particle.x;
      const dy = mousePosition.current.y - particle.y;
      const distance = Math.hypot(dy, dx);
      if (distance < radius) {
        angle = Math.atan2(dy, dx);
        particle.x -= Math.cos(angle);
        particle.y -= Math.sin(angle);
      }
    }
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

    // for (let index = i; index < particleArrayRef.current.length; index++) {
  });
}
