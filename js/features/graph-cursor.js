function initGraphCursor() {
    const canvas = document.getElementById("graph-canvas");
    const dot = document.getElementById("graph-cursor-dot");
    if (!canvas || !dot) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    // Set canvas size
    function setSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setSize();
    window.addEventListener("resize", setSize);

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        dot.style.left = `${mouse.x}px`;
        dot.style.top = `${mouse.y}px`;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
            this.speedX = (Math.random() * 1.5) - 0.75;
            this.speedY = (Math.random() * 1.5) - 0.75;
        }

        draw() {
            ctx.fillStyle = document.documentElement.classList.contains("dark") ? "rgba(129, 140, 248, 0.8)" : "rgba(99, 102, 241, 0.8)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            // Movement
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off edges
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

            // Interaction with mouse
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                const directionX = forceDirectionX * force * this.density;
                const directionY = forceDirectionY * force * this.density;
                
                this.x -= directionX;
                this.y -= directionY;
            }
        }
    }

    function init() {
        particles = [];
        const numberOfParticles = (canvas.width * canvas.height) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    opacityValue = 1 - (distance / 100);
                    ctx.strokeStyle = document.documentElement.classList.contains("dark") 
                        ? `rgba(129, 140, 248, ${opacityValue * 0.5})` 
                        : `rgba(99, 102, 241, ${opacityValue * 0.5})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }

            // Connect to mouse
            let dxMouse = particles[a].x - mouse.x;
            let dyMouse = particles[a].y - mouse.y;
            let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            if (distMouse < mouse.radius) {
                opacityValue = 1 - (distMouse / mouse.radius);
                ctx.strokeStyle = document.documentElement.classList.contains("dark") 
                    ? `rgba(129, 140, 248, ${opacityValue * 0.8})` 
                    : `rgba(99, 102, 241, ${opacityValue * 0.8})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        connect();
        requestAnimationFrame(animate);
    }

    init();
    animate();

    // Hover effect for interactive elements
    const interactables = "a, button, select, input, textarea, .cursor-pointer, [role='button'], .skill-card, .project-card";
    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(interactables)) {
            document.body.classList.add("cursor-hover");
            mouse.radius = 250; // Expand connection radius on hover
        }
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(interactables)) {
            document.body.classList.remove("cursor-hover");
            mouse.radius = 150;
        }
    });

    document.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
        dot.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
        dot.style.opacity = "1";
    });
}
