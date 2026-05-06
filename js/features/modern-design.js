function initModernDesign() {
    // 1. Magnetic Buttons logic
    const magnetics = document.querySelectorAll("a, button, .skill-card, .project-card");
    
    magnetics.forEach(el => {
        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move the element slightly towards the mouse (magnetic effect)
            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        el.addEventListener("mouseleave", () => {
            el.style.transform = "translate(0, 0)";
        });
        
        // Ensure smooth transition back
        el.style.transition = "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)";
    });

    // 2. Grainy Gradient Background
    // Adding a subtle grain texture to the blobs
    const blobs = document.querySelectorAll(".blob");
    blobs.forEach(blob => {
        blob.style.backgroundImage += ", url('https://grainy-gradients.vercel.app/noise.svg')";
        blob.style.backgroundBlendMode = "overlay";
    });
}
