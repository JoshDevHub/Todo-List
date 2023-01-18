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

modal.render();
renderStaticComponents();

const renderCurrentProject = () => {
  renderProjectGallery(projectManager.currentProject());
}

renderCurrentProject();

const addTodoHandler = () => {
  modal.toggle();
  renderItemForm(projectManager.currentProject());
}

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
  if (event.target.getAttribute("data-btn") === "add-project") {
    modal.toggle();
    renderProjectForm(projectManager);
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

new Button("Add Todo", addTodoHandler).render();
new Button("Check Todo", () => console.log(projectManager.currentProject())).render();
