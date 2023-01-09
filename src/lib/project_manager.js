import Project from "./project";

// class for holding and managing multiple projects
const projectManager = new class ProjectManager {
  constructor() {
    this.projects = [new Project()];
    this.currentIndex = 0;
  }

  currentProject() {
    return this.projects[this.currentIndex];
  }

  addProject(name) {
    const newProject = new Project(name);
    this.projects.push(newProject);
  }

  deleteProjectAt(index) {
    if (index <= 0 || index >= this.projects.length) return;

    this.projects.splice(index, 1);
  }
}()

export default projectManager;
