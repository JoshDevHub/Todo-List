import Project from "./project";
import createIdWrapper from "../utils/create_uuid";

// class for holding and managing multiple projects
const projectManager = new class ProjectManager {
  constructor() {
    this.projects = [
      createIdWrapper(new Project())
    ];
    this.currentIndex = 0;
  }

  currentProject() {
    return this.projects[this.currentIndex].data;
  }

  addProject(project) {
    const newProject = createIdWrapper(project);
    this.projects.push(newProject);
  }

  deleteProjectAt(index) {
    if (index <= 0 || index >= this.projects.length) return;

    this.projects.splice(index, 1);
  }
}()

export default projectManager;
