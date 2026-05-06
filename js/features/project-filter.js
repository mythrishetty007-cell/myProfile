let currentCategory = "All";
let currentSearchTerm = "";
let currentSort = "default";

function applyAllFilters() {
    let filtered = projectsData.filter(project => {
        const matchesCategory = currentCategory === "All" || project.category === currentCategory;
        
        // Use a safe array check in case technologies is string or array
        const techs = Array.isArray(project.technologies) ? project.technologies : [project.technologies];
        const matchesSearch = project.name.toLowerCase().includes(currentSearchTerm) || 
                              project.description.toLowerCase().includes(currentSearchTerm) ||
                              techs.some(tech => tech.toLowerCase().includes(currentSearchTerm));
        
        return matchesCategory && matchesSearch;
    });

    if (currentSort === "name-asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === "name-desc") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (currentSort === "status") {
        filtered.sort((a, b) => a.status.localeCompare(b.status));
    }

    renderProjects(filtered);
}

function initProjectFilters() {
    const filterContainer = document.getElementById("project-filters");
    if (!filterContainer) return;

    filterContainer.innerHTML = "";
    const categories = ["All", ...new Set(projectsData.map(p => p.category))];

    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.className = `px-6 py-2 rounded-full font-bold transition-all duration-300 ${category === "All" ? "bg-blue-600 text-white" : "bg-white text-gray-700 shadow-sm hover:bg-gray-100"}`;
        btn.textContent = category;
        
        btn.addEventListener("click", () => {
            Array.from(filterContainer.children).forEach(child => {
                child.className = "px-6 py-2 rounded-full font-bold transition-all duration-300 bg-white text-gray-700 shadow-sm hover:bg-gray-100";
            });
            btn.className = "px-6 py-2 rounded-full font-bold transition-all duration-300 bg-blue-600 text-white shadow-sm";

            currentCategory = category;
            applyAllFilters();
        });

        filterContainer.appendChild(btn);
    });
}