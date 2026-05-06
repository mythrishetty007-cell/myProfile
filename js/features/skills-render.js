let currentSkillCategory = "All";

// Color palette per category / skill color key
const colorMap = {
    indigo:  { ring: "ring-indigo-400",  bar: "from-indigo-500 to-indigo-400",  text: "text-indigo-500",  badge: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300",  glow: "group-hover:shadow-indigo-500/20" },
    sky:     { ring: "ring-sky-400",     bar: "from-sky-500 to-cyan-400",        text: "text-sky-500",     badge: "bg-sky-50 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300",              glow: "group-hover:shadow-sky-500/20" },
    yellow:  { ring: "ring-yellow-400",  bar: "from-yellow-500 to-amber-400",    text: "text-yellow-500",  badge: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-300",  glow: "group-hover:shadow-yellow-500/20" },
    emerald: { ring: "ring-emerald-400", bar: "from-emerald-500 to-green-400",   text: "text-emerald-500", badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300", glow: "group-hover:shadow-emerald-500/20" },
    green:   { ring: "ring-green-400",   bar: "from-green-500 to-emerald-400",   text: "text-green-500",   badge: "bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-300",      glow: "group-hover:shadow-green-500/20" },
    orange:  { ring: "ring-orange-400",  bar: "from-orange-500 to-amber-400",    text: "text-orange-500",  badge: "bg-orange-50 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300",  glow: "group-hover:shadow-orange-500/20" },
    slate:   { ring: "ring-slate-400",   bar: "from-slate-500 to-slate-400",     text: "text-slate-500",   badge: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",        glow: "group-hover:shadow-slate-500/20" },
    rose:    { ring: "ring-rose-400",    bar: "from-rose-500 to-pink-400",       text: "text-rose-500",    badge: "bg-rose-50 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300",          glow: "group-hover:shadow-rose-500/20" },
    blue:    { ring: "ring-blue-400",    bar: "from-blue-500 to-indigo-400",     text: "text-blue-500",    badge: "bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300",          glow: "group-hover:shadow-blue-500/20" },
};


function renderSkills(skillsToRender = skillsData) {
    const skillsContainer = document.getElementById("skills-container");
    if (!skillsContainer) return;

    skillsContainer.innerHTML = "";

    if (skillsToRender.length === 0) {
        skillsContainer.innerHTML = "<p class='col-span-full text-center text-gray-500 font-bold py-20'>No skills found.</p>";
        return;
    }

    skillsToRender.forEach(function(skill, index) {
        const c = colorMap[skill.color] || colorMap.indigo;

        const card = document.createElement("div");
        card.className = [
            "skill-card relative group p-8 rounded-[2rem]",
            "glass-panel shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10",
            "transition-all duration-700",
            "opacity-0 translate-y-8"
        ].join(" ");

        // Entrance animation
        setTimeout(function() {
            card.classList.remove("opacity-0", "translate-y-8");
        }, index * 100);

        // Watermark background
        const watermark = document.createElement("div");
        watermark.className = `skill-watermark ${c.text}`;
        watermark.textContent = skill.shortLabel || skill.name.charAt(0);

        // Header section
        const header = document.createElement("div");
        header.className = "skill-card-inner relative z-10 flex flex-col items-center text-center mb-6";

        // Icon container (simplified without progress circle)
        const iconContainer = document.createElement("div");
        iconContainer.className = [
            "w-20 h-20 mb-6 flex items-center justify-center rounded-3xl",
            "bg-white dark:bg-slate-800/80 shadow-lg ring-1 ring-slate-100 dark:ring-slate-700/50",
            "group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
        ].join(" ");
        iconContainer.innerHTML = skill.icon;


        const nameBlock = document.createElement("div");
        
        const nameEl = document.createElement("h3");
        nameEl.className = "text-xl font-black text-slate-800 dark:text-white mb-1 tracking-tight";
        nameEl.textContent = skill.name;

        const catEl = document.createElement("span");
        catEl.className = `text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${c.badge}`;
        catEl.textContent = skill.category || "Skill";

        nameBlock.appendChild(nameEl);
        nameBlock.appendChild(catEl);

        header.appendChild(iconContainer);
        header.appendChild(nameBlock);

        // Description
        const descEl = document.createElement("p");
        descEl.className = "skill-card-inner relative z-10 text-sm text-slate-500 dark:text-slate-300 leading-relaxed text-center font-medium";
        descEl.textContent = skill.description;


        // Assemble card
        card.appendChild(watermark);
        card.appendChild(header);
        card.appendChild(descEl);

        skillsContainer.appendChild(card);
    });

}

function initSkillsFilters() {
    const filterContainer = document.getElementById("skills-filters");
    if (!filterContainer) return;

    filterContainer.innerHTML = "";
    const categories = ["All", ...new Set(skillsData.map(s => s.category).filter(Boolean))];

    const activeClass   = "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 bg-slate-900 text-white shadow-xl shadow-slate-200 dark:shadow-none dark:bg-indigo-500 dark:text-white";
    const inactiveClass = "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 bg-white text-slate-500 shadow-sm border border-slate-100 hover:border-indigo-500 hover:text-indigo-600 dark:bg-slate-800/40 dark:border-slate-700 dark:text-slate-400 dark:hover:border-indigo-400 dark:hover:text-indigo-300";


    categories.forEach(function(category) {
        const btn = document.createElement("button");
        btn.className = category === currentSkillCategory ? activeClass : inactiveClass;
        btn.textContent = category;

        btn.addEventListener("click", function() {
            if (currentSkillCategory === category) return;
            
            currentSkillCategory = category;
            Array.from(filterContainer.children).forEach(function(child) {
                child.className = child.textContent === category ? activeClass : inactiveClass;
            });
            
            // Re-render with fade effect
            const skillsContainer = document.getElementById("skills-container");
            skillsContainer.style.opacity = "0";
            skillsContainer.style.transform = "translateY(10px)";
            
            setTimeout(() => {
                const filtered = category === "All" ? skillsData : skillsData.filter(s => s.category === category);
                renderSkills(filtered);
                skillsContainer.style.opacity = "1";
                skillsContainer.style.transform = "translateY(0)";
            }, 300);
        });

        filterContainer.appendChild(btn);
    });
}