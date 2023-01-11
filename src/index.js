// entry point script

import "./styles/reset.css";
import "./styles/app.css";

import renderStaticComponents from "./static/render_static_components";

import Button from "./components/button";
import renderProjectGallery from "./components/project_gallery";
import modal from "./components/modal";
import renderItemForm from "./components/todo_item_form";

import projectManager from "./lib/project_manager";

import pubsub from "./utils/pubsub";

renderStaticComponents();
modal.render();

/* const projectGallery = createProjectComponent(projectManager.currentProject()); */
/* const projectGallery = renderProjectGallery(projectManager.currentProject()); */
const renderCurrentProject = () => {
  renderProjectGallery(projectManager.currentProject());
}
renderCurrentProject();

pubsub.subscribe("updateProject", renderCurrentProject);

const addTodoHandler = () => {
  modal.toggle();
  renderItemForm(projectManager.currentProject());
}

new Button("Add Todo", addTodoHandler).render();
new Button("Check Todo", () => console.log(projectManager.currentProject())).render();
