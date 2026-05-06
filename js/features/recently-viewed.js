// ── Safe localStorage helpers ────────────────────────────────────────────────
function storageGet(key) {
    try { return localStorage.getItem(key); }
    catch (e) { return null; }
}
function storageSet(key, value) {
    try { localStorage.setItem(key, value); }
    catch (e) { /* storage blocked by Tracking Prevention — silently ignore */ }
}

// ── Recently Viewed Projects ─────────────────────────────────────────────────
let recentlyViewed = [];

function initRecentlyViewed() {
    const saved = storageGet('recently-viewed-projects');
    if (saved) {
        try {
            recentlyViewed = JSON.parse(saved);
            renderRecentlyViewed();
        } catch (e) {
            console.error("Could not parse recently viewed projects");
        }
    }
}

function addToRecentlyViewed(project) {
    recentlyViewed = recentlyViewed.filter(p => p.id !== project.id);
    recentlyViewed.unshift(project);

    if (recentlyViewed.length > 3) {
        recentlyViewed.pop();
    }

    storageSet('recently-viewed-projects', JSON.stringify(recentlyViewed));
    renderRecentlyViewed();
}

function renderRecentlyViewed() {
    const container = document.getElementById('recently-viewed-container');
    const section   = document.getElementById('recently-viewed-section');

    if (!container || !section) return;

    if (recentlyViewed.length === 0) {
        section.classList.add('hidden');
        return;
    }

    section.classList.remove('hidden');
    container.innerHTML = '';

    recentlyViewed.forEach(project => {
        const card = document.createElement("div");
        card.className = "p-6 text-center bg-gray-50 dark:bg-slate-800 rounded-3xl shadow transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-slate-700";

        const projectName = document.createElement("h3");
        projectName.className = "text-xl font-bold mb-1 text-slate-900 dark:text-white";
        projectName.textContent = project.name;

        const projectCategory = document.createElement("span");
        projectCategory.className = "text-sm font-semibold mb-3 block text-gray-500 dark:text-gray-400";
        projectCategory.textContent = project.category;

        card.appendChild(projectName);
        card.appendChild(projectCategory);
        container.appendChild(card);
    });
}
