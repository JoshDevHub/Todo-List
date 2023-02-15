// entry point script

import "./styles/reset.css";
import "./styles/app.css";

import domController from "./dom_controller";
import { storage } from "./storage";
import Project from "./models/project";

const App = (() => {
  const projectManager = storage.loadOrInit();
  const saveCallback = storage.save(projectManager);

  domController.modal.render();

  const renderCurrentProject = () => {
    domController.renderProject(projectManager.currentProject());
  }
  renderCurrentProject();

  projectManager.subscribe("addProject", renderCurrentProject);
  projectManager.subscribe("updateProject", domController.renderProjectList);
  projectManager.subscribe("deleteProject", domController.renderProjectList);
  projectManager.subscribe("projectChanged", renderCurrentProject);

  projectManager.subscribe("addProject", saveCallback);
  projectManager.subscribe("updateProject", saveCallback);
  projectManager.subscribe("deleteProject", saveCallback);
  projectManager.subscribe("projectChanged", saveCallback);

  const handleNewTodoClick = (event) => {
    if (event.target.getAttribute("data-btn") === "add-todo") {
      domController.modal.toggle();
      domController.renderNewItemForm(projectManager.currentProject());
    }
  }

  const handleEditTodoClick = (event) => {
    const editButton = event.target.closest("[data-btn='edit-todo']");
    if (!editButton) return;

    const todoId = editButton.value;
    domController.modal.toggle();
    domController.renderEditItemForm(
      todoId,
      projectManager.currentProject()
    )
  }

  document.body.addEventListener("click", handleEditTodoClick);
  document.body.addEventListener("click", handleNewTodoClick);

  const openProjectMenu = () => {
    domController.renderProjectList(projectManager);
  }

  const handleProjectClick = (event) => {
    const projectCard = event.target.closest("[data-project]");
    if (!projectCard || event.target.closest("button")) return;

    const projectId = projectCard.getAttribute("data-project");
    projectManager.setCurrentProject(projectId);
    renderCurrentProject();
  }

  document.body.addEventListener("click", handleProjectClick);

  const handleEditProjectClick = (event) => {
    const editButton = event.target.closest("[data-btn='edit-project']")
    if (!editButton) return;

    domController.modal.toggle();
    domController.renderEditProjectForm(
      projectManager,
      editButton.value
    )
  }

  document.body.addEventListener("click", handleEditProjectClick);

  const handleNewProjectClick = (event) => {
    if (event.target.getAttribute("data-btn") === "add-project") {
      domController.modal.toggle();
      domController.renderNewProjectForm(projectManager, new Project());
    }
  }

  document.body.addEventListener("click", handleNewProjectClick);

  document.querySelector("[data-btn='projects']")
    .addEventListener("click", openProjectMenu);
})();
