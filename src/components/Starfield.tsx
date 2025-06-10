import { useEffect, useRef } from 'react';

const STAR_COUNT = 120;
const STAR_COLOR = "#fff";
const STAR_SIZE = 1.2;
const STAR_SPEED = 0.15;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<{ x: number; y: number; z: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    stars.current = Array.from({ length: STAR_COUNT }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      z: randomBetween(0.2, 1),
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const star of stars.current) {
        ctx.globalAlpha = star.z;
        ctx.beginPath();
        ctx.arc(star.x, star.y, STAR_SIZE * star.z, 0, 2 * Math.PI);
        ctx.fillStyle = STAR_COLOR;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function update() {
      for (const star of stars.current) {
        star.x += STAR_SPEED * star.z * 2;
        if (star.x > width) {
          star.x = 0;
          star.y = randomBetween(0, height);
          star.z = randomBetween(0.2, 1);
        }
      }
    }

    let animationId: number;
    function animate() {
      update();
      draw();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default Starfield;