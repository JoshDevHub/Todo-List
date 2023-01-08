// entry point script

import "./styles/reset.css";
import "./styles/app.css";

import Project from "./lib/project";
import createProjectComponent from "./components/project_gallery";

import renderStaticComponents from "./static_components/render_static_components";
import modal from "./components/modal";
import Button from "./components/button";
import pubsub from "./components/pubsub";

import TodoItemForm from "./components/todo_item_form";

renderStaticComponents();
modal.render();

let currentProject = new Project();
const projectGallery = createProjectComponent(currentProject);

pubsub.subscribe("updateProject", projectGallery.render);

const addTodoHandler = () => {
  modal.toggle();
  const form = new TodoItemForm(currentProject);
  form.render(currentProject);
}

new Button("Add Todo", addTodoHandler).render();
new Button("Check Todo", () => console.log(currentProject)).render();
