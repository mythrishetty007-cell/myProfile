function projectfilter(){
   
    const targetCategories = ["MERN", "Frontend", "JavaScript"];
    const filteredProjects = projectsData.filter(project => targetCategories.includes(project.category)
);
    console.log(filteredProjects);
    return filteredProjects;

}