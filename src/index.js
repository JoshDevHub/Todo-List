// entry point script

import "./styles/reset.css";
import "./styles/app.css";

import domController from "./dom_controller";

import ProjectManager from "./models/project_manager";
import Project from "./models/project";

modal.render();

const renderCurrentProject = () => {
  domController.renderProject(projectManager.currentProject());
}

renderCurrentProject();
projectManager.subscribe(
  "addProject",
  renderCurrentProject
)

projectManager.subscribe(
  "updateProject",
  domController.renderProjectList
)

projectManager.subscribe(
  "deleteProject",
  domController.renderProjectList
)

const addTodoHandler = (event) => {
  if (event.target.getAttribute("data-btn") === "add-todo") {
    domController.modal.toggle();
    domController.renderNewItemForm(projectManager.currentProject());
  }
}

const editTodoHandler = (event) => {
  const editButton = event.target.closest("[data-btn='edit-todo']");
  if (!editButton) return;

  const todoId = editButton.value;
  domController.modal.toggle();
  domController.renderEditItemForm(
    projectManager.findItemInCurrentProject(todoId)
  )
}

document.body.addEventListener("click", editTodoHandler);

document.body.addEventListener("click", addTodoHandler);

const openProjectMenu = () => {
  domController.renderProjectList(projectManager);
}

document.body.addEventListener("click", (event) => {
  const projectCard = event.target.closest("[data-project]");
  if (!projectCard || event.target.closest("button")) return;

  const projectId = projectCard.getAttribute("data-project");
  projectManager.setCurrentProject(projectId);
  renderCurrentProject();
})

document.body.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-btn='edit-project']")
  if (!editButton) return;

  domController.modal.toggle();
  domController.renderEditProjectForm(
    projectManager,
    editButton.value
  )
})

document.body.addEventListener("click", (event) => {
  if (event.target.getAttribute("data-btn") === "add-project") {
    domController.modal.toggle();
    domController.renderNewProjectForm(projectManager, new Project());
  }
})

document.querySelector("[data-btn='projects']")
        .addEventListener("click", openProjectMenu);

document.body.addEventListener("click", (event) => {
  const rerenderButton = event.target.closest("[data-rerender]");
  if (!rerenderButton) return;

  const rerenderAttribute = rerenderButton.getAttribute("data-rerender");
  if (rerenderAttribute === "currentProject") {
    renderCurrentProject();
  } else if (rerenderAttribute === "projectSelect") {
    openProjectMenu();
  }
})
