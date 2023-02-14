import renderProject from "./components/projects/view";
import modal from "./components/modal";
import { renderNewItemForm, renderEditItemForm } from "./components/todo_items/form";
import { renderNewProjectForm, renderEditProjectForm } from "./components/projects/form";
import renderProjectList from "./components/projects/list";

const domController = (() => {
  return {
    modal,
    renderProject,
    renderNewItemForm,
    renderEditItemForm,
    renderNewProjectForm,
    renderEditProjectForm,
    renderProjectList
  }
})()

export default domController;
