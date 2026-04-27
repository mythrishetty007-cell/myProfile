function projectsearch(){
    let project = projectsData;
    let projects = project.map(item=>projectfilter);
    console.log("projects");
    return projects;
}