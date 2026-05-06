function initModal() {
    const modal = document.getElementById("contact-modal");
    const modalContent = document.getElementById("modal-content");
    const modalClose = document.getElementById("modal-close");
    const formCancel = document.getElementById("form-cancel");
    
    // Select ALL elements that should trigger the modal
    // (The floating button AND the "Let's Talk" links in the nav)
    const modalTriggers = document.querySelectorAll("#modal-trigger, #nav-contact-btn, a[href='#contact']");

    if(!modal || !modalContent || !modalClose || !formCancel) {
        console.log("Modal elements not found");
        return;
    }

    function openModal(e) {
        if (e) e.preventDefault(); // Prevent anchor links from jumping the page
        
        // Show the backdrop first
        modal.classList.remove("hidden");
        
        // Slight delay to allow CSS transition to animate the scale/opacity
        setTimeout(function() {
            modalContent.classList.remove("scale-95", "opacity-0");
            modalContent.classList.add("scale-100", "opacity-100");
        }, 10);
    }

    function closeModal() {
        // Animate the modal content shrinking/fading out first
        modalContent.classList.remove("scale-100", "opacity-100");
        modalContent.classList.add("scale-95", "opacity-0");
        
        // Wait for the animation to finish (300ms) before hiding the backdrop
        setTimeout(function() {
            modal.classList.add("hidden");
        }, 300);
    }

    // Attach event listeners to ALL triggers
    modalTriggers.forEach(trigger => {
        trigger.addEventListener("click", openModal);
    });

    modalClose.addEventListener("click", closeModal);
    formCancel.addEventListener("click", closeModal);

    // Close when clicking on backdrop or padding area (outside the modal content)
    modal.addEventListener("click", function(event) {
        // If the click is NOT inside modalContent, close it
        if (!modalContent.contains(event.target)) {
            closeModal();
        }
    });
}