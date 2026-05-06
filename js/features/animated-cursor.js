function initAnimatedCursor() {
    const main = document.getElementById("cursor-main");
    const satellites = document.querySelectorAll(".cursor-satellite");
    if (!main || satellites.length === 0) return;

    let mouseX = 0;
    let mouseY = 0;
    let mainX = 0;
    let mainY = 0;

    // Orbit parameters
    let angle = 0;
    const radius = 25;
    const speed = 0.05;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }

    function animate() {
        // Smooth follow for main ring
        mainX = lerp(mainX, mouseX, 0.15);
        mainY = lerp(mainY, mouseY, 0.15);

        main.style.left = `${mainX}px`;
        main.style.top = `${mainY}px`;

        // Update orbit angle
        angle += speed;

        // Position satellites
        satellites.forEach((sat, index) => {
            // Offset each satellite by 120 degrees
            const offset = (Math.PI * 2 / satellites.length) * index;
            const targetX = mainX + Math.cos(angle + offset) * radius;
            const targetY = mainY + Math.sin(angle + offset) * radius;

            // Lagging movement for satellites
            const satX = lerp(parseFloat(sat.style.left) || mainX, targetX, 0.2);
            const satY = lerp(parseFloat(sat.style.top) || mainY, targetY, 0.2);

            sat.style.left = `${satX}px`;
            sat.style.top = `${satY}px`;
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Hover effect
    const interactables = "a, button, select, input, textarea, .cursor-pointer, [role='button'], .skill-card, .project-card";
    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(interactables)) {
            document.body.classList.add("cursor-hover");
        }
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(interactables)) {
            document.body.classList.remove("cursor-hover");
        }
    });

    // Visibility
    document.addEventListener("mouseleave", () => {
        main.style.opacity = "0";
        satellites.forEach(s => s.style.opacity = "0");
    });

    document.addEventListener("mouseenter", () => {
        main.style.opacity = "1";
        satellites.forEach(s => s.style.opacity = "1");
    });
}
