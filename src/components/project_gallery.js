import { buildElement } from "../utils/dom_helpers";
import renderTodoItemCard from "./todo_item_card";

const createProjectGallery = (todoProject) => {
  const project = todoProject;

  const buildItemContainer = () => {
    return {
      tag: "section",
      attributes: { class: "container" },
      children: [
        { tag: "h2", text: todoProject.name },
        {
          tag: "button",
          text: "Add Todo Item",
          attributes: { "data-btn": "add-todo" }
        }
      ]
    }
  }

  const deleteHandler = (event) => {
    if (event.target.getAttribute("data-btn") === "delete") {
      const id = event.target.getAttribute("data-id");
      project.deleteItemWith(id);
    }
  }

  const render = () => {
    const fragment = document.createDocumentFragment();
    const projectContainer = buildElement(buildItemContainer());

    project.todoList.forEach((item) => {
      renderTodoItemCard(item.data, item.id, projectContainer);
    })

    projectContainer.addEventListener("click", deleteHandler);

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
