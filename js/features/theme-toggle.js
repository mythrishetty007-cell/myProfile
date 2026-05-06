function initThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle");
    const html = document.documentElement;
    const body = document.body;

    const sunIcon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path></svg>`;
    const moonIcon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;

    function storageGet(key) {
        try { return localStorage.getItem(key); }
        catch (e) { return null; }
    }
    function storageSet(key, value) {
        try { localStorage.setItem(key, value); }
        catch (e) { }
    }

    function updateIcon() {
        if (toggleBtn) {
            toggleBtn.innerHTML = html.classList.contains("dark") ? sunIcon : moonIcon;
        }
    }

    if (storageGet("portfolio-theme") === "dark") {
        html.classList.add("dark");
        body.classList.add("dark-mode");
    }
    updateIcon();

    async function toggleTheme(event) {
        if (!document.startViewTransition) {
            applyThemeChange();
            return;
        }

        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            applyThemeChange();
        });

        await transition.ready;

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 500,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    }

    function applyThemeChange() {
        html.classList.toggle("dark");
        body.classList.toggle("dark-mode");
        storageSet("portfolio-theme", html.classList.contains("dark") ? "dark" : "light");
        updateIcon();
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", toggleTheme);
    }
}