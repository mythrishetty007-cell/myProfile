function initMinimalCursor() {
    const cursor = document.getElementById("minimal-cursor");
    const ring = document.getElementById("cursor-ring-inner");
    const dot = document.getElementById("cursor-dot-inner");
    if (!cursor || !ring || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let dotX = 0;
    let dotY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }

    function animate() {
        // Dot follows almost instantly (Gaming precision)
        dotX = lerp(dotX, mouseX, 0.4);
        dotY = lerp(dotY, mouseY, 0.4);
        
        // Ring follows with a smooth delay (Modern elegance)
        ringX = lerp(ringX, mouseX, 0.15);
        ringY = lerp(ringY, mouseY, 0.15);

        dot.style.left = `${dotX}px`;
        dot.style.top = `${dotY}px`;
        
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;

        // Ensure visibility
        cursor.style.opacity = "1";

        requestAnimationFrame(animate);
    }


    animate();

    // Hover effect
    const interactables = "a, button, select, input, textarea, .cursor-pointer, [role='button'], .skill-card, .project-card, .about-dot";
    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(interactables)) {
            document.body.classList.add("cursor-hover");
            ring.style.width = "40px";
            ring.style.height = "40px";
            ring.style.backgroundColor = "rgba(99, 102, 241, 0.1)";
            ring.style.borderColor = "rgba(99, 102, 241, 0.4)";
            dot.style.transform = "translate(-50%, -50%) scale(0)"; // Hide dot on hover
        }
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(interactables)) {
            document.body.classList.remove("cursor-hover");
            ring.style.width = "32px";
            ring.style.height = "32px";
            ring.style.backgroundColor = "transparent";
            ring.style.borderColor = document.documentElement.classList.contains("dark") ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)";
            dot.style.transform = "translate(-50%, -50%) scale(1)";
        }
    });

    // Initial visibility
    cursor.style.opacity = "1";

    // Visibility
    document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
        cursor.style.opacity = "1";
    });
}

