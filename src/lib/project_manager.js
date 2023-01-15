import Project from "./project";
import createIdWrapper from "../utils/create_uuid";

// class for holding and managing multiple projects
const projectManager = new class ProjectManager {
  #projects;

  constructor() {
    this.#projects = [
      createIdWrapper(new Project())
    ];
    this.currentIndex = 0;
  }

  get projects() {
    return [...this.#projects];
  }

  currentProject() {
    return this.#projects[this.currentIndex].data;
  }

  setCurrentProject(id) {
    this.currentIndex = this.#projects.findIndex((proj) => proj.id === id);
  }

  addProject(project) {
    const newProject = createIdWrapper(project);
    this.#projects.push(newProject);
    this.setCurrentProject(newProject.id);
  }

  deleteProjectAt(index) {
    if (index <= 0 || index >= this.projects.length) return;

    this.#projects.splice(index, 1);
  }
}()

export default projectManager;
