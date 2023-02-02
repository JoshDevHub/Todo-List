import { buildElement } from "../../utils/dom_helpers";
import renderTodoItem from "../todo_items/view";

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
          text: "Add Todo Item +",
          attributes: { "data-btn": "add-todo", class: "btn btn--primary" }
        }
      ]
    }
  }

  const deleteHandler = (event) => {
    const deleteButton = event.target.closest("[data-btn='delete']")
    if (!deleteButton) return;

    const id = deleteButton.value;
    project.deleteItemWith(id);
  }

  const showEmptyState = () => {
    return buildElement(
      {
        tag: "p",
        text: "This list doesn't have any todos yet. Click the button to add one."
      }
    )
  }

  const render = () => {
    const fragment = document.createDocumentFragment();
    const projectContainer = buildElement(buildItemContainer());

    if (project.isEmpty()) {
      projectContainer.appendChild(showEmptyState());
    }

    project.todoList.forEach((item) => {
      renderTodoItem(item.data, item.id, projectContainer);
    })

    projectContainer.addEventListener("click", deleteHandler);

    fragment.appendChild(projectContainer);

    const entryPoint = document.querySelector("main");
    entryPoint.replaceChildren();
    entryPoint.appendChild(fragment);
  }

  return { render };
}

export default function renderProject(todoProject) {
  createProjectGallery(todoProject).render();
}
