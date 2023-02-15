import ProjectManager from "./models/project_manager";

const storage = (() => {
  const save = (todoApp) => () => {
    localStorage.setItem("todo-manager", todoApp.serialize());
  }

  const loadOrInit = () => {
    const saveData = localStorage.getItem("todo-manager");
    return saveData ? ProjectManager.fromJSON(saveData) : new ProjectManager();
  }

  return { save, loadOrInit }
})()

export { storage };
