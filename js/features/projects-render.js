function renderProjects(projectsToRender = projectsData) {
    const projectsContainer = document.getElementById("projects-container");
    const countDisplay = document.getElementById("project-count");

    if (!projectsContainer) {
         console.log("Projects container not found");
        return;   
    }
    
    if (countDisplay) {
        countDisplay.textContent = `${projectsToRender.length} project(s) found`;
    }

    projectsContainer.innerHTML = "";
    
    if (projectsToRender.length === 0) {
        projectsContainer.innerHTML = "<p class='col-span-full text-center text-gray-500 dark:text-gray-400 font-bold'>No projects match your criteria.</p>";
        return;
    }

    projectsToRender.forEach(function(project){
        const card = document.createElement("div");
        card.className = "p-8 text-center bg-white dark:bg-slate-800 rounded-3xl shadow-lg transition-all duration-500 hover:shadow-2xl cursor-pointer";

        card.addEventListener('click', () => {
            if(typeof addToRecentlyViewed === 'function') {
                addToRecentlyViewed(project);
            }
        });

        const iconBox = document.createElement("div");
        iconBox.className = "w-20 h-20 mx-auto mb-4 bg-purple-900 rounded-2xl flex items-center justify-center";
        
        const iconText = document.createElement("span");
        iconText.className = "text-2xl text-white font-bold";
        iconText.textContent = project.id;
        
        iconBox.appendChild(iconText);

        const projectName = document.createElement("h3");
        projectName.className = "text-2xl font-bold mb-2 text-slate-900 dark:text-white";
        projectName.textContent = project.name;

        const projectCategory = document.createElement("span");
        projectCategory.className = "text-md font-semibold mb-3 block text-gray-500 dark:text-gray-400";
        projectCategory.textContent = project.category;

        const descContainer = document.createElement("div");
        descContainer.className = "mb-5 min-h-[4rem]";
        
        const projectDescription = document.createElement("p");
        projectDescription.className = "text-sm text-gray-700 dark:text-gray-300";
        
        const fullText = project.description;
        const shortText = fullText.length > 50 ? fullText.slice(0, 50) + "..." : fullText;
        projectDescription.textContent = shortText;
        
        descContainer.appendChild(projectDescription);

        if (fullText.length > 50) {
            const toggleBtn = document.createElement("button");
            toggleBtn.className = "text-xs text-blue-600 dark:text-blue-400 font-bold mt-2 hover:underline";
            toggleBtn.textContent = "View More";
            
            let isExpanded = false;
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                isExpanded = !isExpanded;
                projectDescription.textContent = isExpanded ? fullText : shortText;
                toggleBtn.textContent = isExpanded ? "View Less" : "View More";
            });
            descContainer.appendChild(toggleBtn);
        }

        const techs = Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies;
        const projectTechnologies = document.createElement("span");
        projectTechnologies.className = "px-3 py-1 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 inline-block mb-4";
        projectTechnologies.textContent = techs;

        const statusContainer = document.createElement("div");
        statusContainer.className = "flex justify-center items-center gap-2";
        
        const projectStatus = document.createElement("span");
        projectStatus.className = "text-xs font-bold uppercase rounded px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-2";
        
        if (project.status === "Live") {
            const pingWrapper = document.createElement("span");
            pingWrapper.className = "relative flex h-2 w-2";
            pingWrapper.innerHTML = `
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            `;
            projectStatus.appendChild(pingWrapper);
        }
        
        const statusText = document.createElement("span");
        statusText.textContent = project.status;
        projectStatus.appendChild(statusText);
        
        statusContainer.appendChild(projectStatus);


        const actionContainer = document.createElement("div");
        actionContainer.className = "flex justify-center gap-3 mt-6";

        if (project.github && project.github !== "#") {
            const githubLink = document.createElement("a");
            githubLink.href = project.github;
            githubLink.target = "_blank";
            githubLink.className = "flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-xs font-bold hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer";
            githubLink.innerHTML = `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg> Code`;
            githubLink.addEventListener('click', (e) => e.stopPropagation());
            actionContainer.appendChild(githubLink);
        }

        if (project.liveDemo && project.liveDemo !== "#") {
            const liveLink = document.createElement("a");
            liveLink.href = project.liveDemo;
            liveLink.target = "_blank";
            liveLink.className = "flex items-center gap-1.5 px-4 py-2 border-2 border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold hover:border-indigo-500 hover:text-indigo-600 transition-all cursor-pointer";
            liveLink.innerHTML = `
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg> Live
            `;

            liveLink.addEventListener('click', (e) => e.stopPropagation());
            actionContainer.appendChild(liveLink);
        }

        card.appendChild(iconBox);
        card.appendChild(projectName);
        card.appendChild(projectCategory);
        card.appendChild(descContainer);
        card.appendChild(projectTechnologies);
        card.appendChild(statusContainer);
        
        if (actionContainer.children.length > 0) {
            card.appendChild(actionContainer);
        }

        projectsContainer.appendChild(card);
    });
}