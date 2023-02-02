import Project from "./project";
import createIdWrapper from "../utils/create_uuid";

// class for holding and managing multiple projects
const projectManager = new class ProjectManager {
  #projects;

  constructor() {
    this.#projects = [
      createIdWrapper(new Project("Todo List"))
    ];
    this.currentIndex = 0;
  }

  get projects() {
    return [...this.#projects];
  }

  findBy(id) {
    return this.#projects.find((project) => project.id === id).data;
  }

  currentProject() {
    return this.#projects[this.currentIndex].data;
  }

  findItemInCurrentProject(id) {
    return this.currentProject().findBy(id);
  }

  setCurrentProject(id) {
    this.currentIndex = this.#projects.findIndex((proj) => proj.id === id);
  }

  addProject(project) {
    const newProject = createIdWrapper(project);
    this.#projects.push(newProject);
    this.setCurrentProject(newProject.id);
  }

  deleteProjectWith(id) {
    this.#projects = this.#projects.filter((project) => project.id !== id);
    this.#setDefaultProject();
  }

  #setDefaultProject() {
    this.currentIndex = 0;
  }
}()

export default projectManager;
