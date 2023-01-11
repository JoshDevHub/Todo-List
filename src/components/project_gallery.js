import { buildElement } from "../utils/dom_helpers";
import renderTodoItemCard from "./todo_item_card";

const createProjectGallery = (todoProject) => {
  const project = todoProject;

  const buildItemContainer = () => {
    return {
      attributes: { class: "container" }
    }
  }

  const render = () => {
    const fragment = document.createDocumentFragment();
    const projectContainer = buildElement(buildItemContainer());

    project.todoList.forEach((item) => {
      renderTodoItemCard(item.data, projectContainer);
    })

    fragment.appendChild(projectContainer);

    const entryPoint = document.querySelector("main");
    entryPoint.replaceChildren();
    entryPoint.appendChild(fragment);
  }

  return { render };
}

export default function renderProjectGallery(todoProject) {
  createProjectGallery(todoProject).render();
}
