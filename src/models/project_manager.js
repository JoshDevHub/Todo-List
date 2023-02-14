import Project from "./project";
import Collection from "../utils/collection";

// class for holding and managing multiple projects
export default class ProjectManager {
  #projects;

  constructor() {
    this.#projects = new Collection(
      new Project("Todo List")
    );
    this.currentIndex = 0;
  }

  get projects() {
    return this.#projects.collection
  }

  findBy(id) {
    return this.#projects.findBy(id);
  }

  currentProject() {
    return this.projects[this.currentIndex].data;
  }

  findItemInCurrentProject(id) {
    return this.currentProject().findBy(id);
  }

  setCurrentProject(id) {
    this.currentIndex = this.projects.findIndex((proj) => proj.id === id);
  }

  addProject(project) {
    this.#projects.add(project);
  }

  deleteProjectWith(id) {
    this.#projects.deleteItemWith(id);
    this.#setDefaultProject();
  }

  #setDefaultProject() {
    this.currentIndex = 0;
  }
}
