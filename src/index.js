// entry point script

import "./styles/reset.css";
import "./styles/app.css";

import renderStaticComponents from "./static/render_static_components";

import Button from "./components/button";
import renderProjectGallery from "./components/project_gallery";
import modal from "./components/modal";
import renderItemForm from "./components/todo_item_form";
import renderProjectForm from "./components/project_form";
import renderProjectMenu from "./components/project_menu";

import projectManager from "./lib/project_manager";

renderStaticComponents();
modal.render();

const renderCurrentProject = () => {
  renderProjectGallery(projectManager.currentProject());
}

const mainContent = document.querySelector("main");
mainContent.addEventListener("click", (event) => {
  if (event.target.getAttribute("data-btn") === "delete") {
    const currentProject = projectManager.currentProject();
    currentProject.deleteItemWith(event.target.getAttribute("data-id"));
    renderCurrentProject();
  }
})

renderCurrentProject();

const addTodoHandler = () => {
  modal.toggle();
  renderItemForm(projectManager.currentProject());
}

const addProjectForm = () => {
  modal.toggle();
  renderProjectForm(projectManager);
}

const openProjectMenu = () => {
  modal.toggle();
  renderProjectMenu(projectManager);
}

document.body.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-project")) {
    const projectId = event.target.getAttribute("data-project");
    projectManager.setCurrentProject(projectId);
    modal.toggle();
    renderCurrentProject();
  }
})

document.body.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-rerender")) {
    renderCurrentProject();
  }
})

new Button("Add Todo", addTodoHandler).render();
new Button("Check Todo", () => console.log(projectManager.currentProject())).render();
new Button("Add Project", addProjectForm).render();
new Button("Change Project", openProjectMenu).render();
