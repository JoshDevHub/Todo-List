import Project from "./project";
import Collection from "../utils/collection";

// class for holding and managing multiple projects
export default class ProjectManager {
  #projects;
  #observers = {};

  static fromJSON(data) {
    const projectList = JSON.parse(data).projects.map(Project.fromJSON);
    return new ProjectManager(projectList);
  }

  constructor(projectList = []) {
    if (projectList.length === 0) {
      this.#projects = new Collection(new Project("Todo List"));
    } else {
      this.#projects = new Collection(...projectList);
    }

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
    this.currentIndex = this.#projects.size - 1;

    this.publish("addProject");
  }

  updateProject(id, updateFunction) {
    const project = this.#projects.findBy(id);
    updateFunction(project);

    this.publish("updateProject", this);
  }

  deleteProjectWith(id) {
    this.#projects.deleteItemWith(id);
    this.#setDefaultProject();

    this.publish("deleteProject", this);
  }

  serialize() {
    const serializedProjects = this.projects.map((project) => {
      return project.data.serialize();
    })

    return JSON.stringify({
      projects: serializedProjects,
    });
  }

  subscribe(actionName, listenerFunction) {
    this.#observers[actionName] ??= [];
    this.#observers[actionName].push(listenerFunction);
  }

  publish(actionName, data) {
    this.#observers[actionName]?.forEach((listener) => {
      listener(data);
    })
  }

  #setDefaultProject() {
    this.currentIndex = 0;
  }
}
