import Project from "./project";
import createIdWrapper from "../utils/create_uuid";
import pubsub from "../utils/pubsub";

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

  setCurrentProject(project) {
    this.currentIndex = this.projects.findIndex((p) => p.data === project);
    pubsub.publish("updateCurrentProject");
  }

  addProject(project) {
    const newProject = createIdWrapper(project);
    this.projects.push(newProject);
  }

  deleteProjectAt(index) {
    if (index <= 0 || index >= this.projects.length) return;

    this.#projects.splice(index, 1);
  }
}()

export default projectManager;
