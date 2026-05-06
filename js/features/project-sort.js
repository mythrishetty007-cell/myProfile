function initProjectSort() {
    const sortSelect = document.getElementById("project-sort");
    if (!sortSelect) return;

    sortSelect.addEventListener("change", (e) => {
        currentSort = e.target.value;
        applyAllFilters();
    });
}
