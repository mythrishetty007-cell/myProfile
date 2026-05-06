function initProjectSearch() {
    const searchInput = document.getElementById("project-search");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
        currentSearchTerm = e.target.value.toLowerCase();
        applyAllFilters();
    });
}