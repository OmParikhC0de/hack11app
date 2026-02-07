import { useEffect, useRef } from 'react';
import './MouseTrail.css';

function MouseTrail() {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const mouse = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const handleMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };

            // Add new particles on mouse move
            for (let i = 0; i < 3; i++) {
                particles.current.push({
                    x: e.clientX + (Math.random() - 0.5) * 10,
                    y: e.clientY + (Math.random() - 0.5) * 10,
                    size: Math.random() * 4 + 2,
                    speedX: (Math.random() - 0.5) * 2,
                    speedY: (Math.random() - 0.5) * 2,
                    life: 1,
                    decay: 0.02 + Math.random() * 0.02,
                    hue: Math.random() > 0.5 ? 150 : 45 // Green or gold
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current = particles.current.filter(p => p.life > 0);

            particles.current.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.life -= p.decay;
                p.size *= 0.98;

                const alpha = p.life * 0.8;
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
                gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${alpha})`);
                gradient.addColorStop(0.5, `hsla(${p.hue}, 100%, 50%, ${alpha * 0.5})`);
                gradient.addColorStop(1, `hsla(${p.hue}, 100%, 30%, 0)`);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return <canvas ref={canvasRef} className="mouse-trail-canvas" />;
}

export default MouseTrail;
