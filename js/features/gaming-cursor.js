function initGamingCursor() {
    const cursor = document.getElementById("gaming-cursor");
    const dot = document.getElementById("cursor-dot-inner");
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }

    function animate() {
        // High-precision follow (less lag than previous styles for "gaming" feel)
        cursorX = lerp(cursorX, mouseX, 0.3);
        cursorY = lerp(cursorY, mouseY, 0.3);

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animate);
    }

    animate();

    // Hover effect for interactive elements
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

    // Muzzle Flash / Click effect
    document.addEventListener("mousedown", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
        dot.style.boxShadow = "0 0 20px 10px rgba(255, 255, 255, 0.8)";
        dot.style.backgroundColor = "#ff0"; // Yellow flash
    });

    document.addEventListener("mouseup", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        dot.style.boxShadow = "0 0 5px #fff";
        dot.style.backgroundColor = "#fff";
    });

    // Visibility
    document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
        cursor.style.opacity = "1";
    });
}
