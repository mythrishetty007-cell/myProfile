function initContactValidation() {
    const contactForm    = document.getElementById("contact-form");
    const contactName    = document.getElementById("contact-name");
    const contactEmail   = document.getElementById("contact-email");
    const contactMessage = document.getElementById("contact-message");
    const formMessage    = document.getElementById("form-message");
    const submitBtn      = contactForm ? contactForm.querySelector("button[type='submit']") : null;

    if (!contactForm || !contactName || !contactEmail || !contactMessage || !formMessage) {
        console.log("Contact form elements not found");
        return;
    }

    // ---- helpers ----
    function showError(msg, focusEl) {
        formMessage.textContent = msg;
        formMessage.className   = "text-sm text-red-500 font-semibold";
        if (focusEl) focusEl.focus();
    }

    function showSuccess(msg) {
        formMessage.textContent = msg;
        formMessage.className   = "text-sm text-green-600 font-semibold";
    }

    function setLoading(isLoading) {
        if (!submitBtn) return;
        submitBtn.disabled    = isLoading;
        submitBtn.textContent = isLoading ? "Sending…" : "Send Message";
    }

    // ---- form submit ----
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name    = contactName.value.trim();
        const email   = contactEmail.value.trim();
        const message = contactMessage.value.trim();

        formMessage.textContent = "";

        // Validation
        if (name === "")               return showError("Name is required.", contactName);
        if (name.length < 3)           return showError("Name must be at least 3 characters.", contactName);
        if (email === "")              return showError("Email is required.", contactEmail);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) return showError("Enter a valid email address.", contactEmail);
        if (message === "")            return showError("Message cannot be empty.", contactMessage);

        setLoading(true);

        // Simulate a short delay then show success
        setTimeout(function() {
            showSuccess("✅ Message received! I'll get back to you soon.");
            contactForm.reset();

            // Clear any autosaved form data
            try { localStorage.removeItem("contact-form-data"); } catch (e) {}

            setLoading(false);
        }, 800);
    });

    // Clear error message as user types
    [contactName, contactEmail, contactMessage].forEach(function(el) {
        el.addEventListener("input", function() {
            formMessage.textContent = "";
        });
    });
}