// entry point script

import "./styles/reset.css";
import "./styles/app.css";

import renderStaticComponents from "./static/render_static_components";

import renderProjectGallery from "./components/project_gallery";
import modal from "./components/modal";
import { renderNewItemForm, renderEditItemForm } from "./components/todo_item_form";
import { renderNewProjectForm, renderEditProjectForm } from "./components/project_form";
import renderProjectMenu from "./components/project_menu";

import projectManager from "./lib/project_manager";
import Project from "./lib/project";

modal.render();
renderStaticComponents();

const renderCurrentProject = () => {
  renderProjectGallery(projectManager.currentProject());
}

renderCurrentProject();

const addTodoHandler = (event) => {
  if (event.target.getAttribute("data-btn") === "add-todo") {
    modal.toggle();
    renderNewItemForm(projectManager.currentProject());
  }
}

const editTodoHandler = (event) => {
  const editButton = event.target.closest("[data-btn='edit-todo']");
  if (!editButton) return;

  const todoId = event.target.getAttribute("data-id");
  modal.toggle();
  renderEditItemForm(
    projectManager.findItemInCurrentProject(todoId)
  )
}

document.body.addEventListener("click", editTodoHandler);

document.body.addEventListener("click", addTodoHandler);

const openProjectMenu = () => {
  renderProjectMenu(projectManager);
}

document.body.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-project")) {
    const projectId = event.target.getAttribute("data-project");
    projectManager.setCurrentProject(projectId);
    renderCurrentProject();
  }
})

document.body.addEventListener("click", (event) => {
  if (event.target.getAttribute("data-btn") === "edit-project") {
    const id = event.target.getAttribute("data-id");
    modal.toggle();
    renderEditProjectForm(projectManager.findBy(id));
  }
})

document.body.addEventListener("click", (event) => {
  if (event.target.getAttribute("data-btn") === "add-project") {
    modal.toggle();
    renderNewProjectForm(projectManager, new Project());
  }
})

document.querySelector("[data-btn='projects']")
        .addEventListener("click", openProjectMenu);

document.body.addEventListener("click", (event) => {
  const rerenderAttribute = event.target.getAttribute("data-rerender");
  if (!rerenderAttribute) return;

  if (rerenderAttribute === "currentProject") {
    renderCurrentProject();
  } else if (rerenderAttribute === "projectSelect") {
    openProjectMenu();
  }
})
