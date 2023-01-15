import { buildElement } from "../utils/dom_helpers";
import modal from "./modal";
import TodoItem from "../lib/todo_item";

const createTodoItemForm = (proj) => {
  const project = proj;
  const entryPoint = document.querySelector(".modal-box");

  const todoItemFromInputs = () => {
    const item = new TodoItem();
    const props = Object.keys(item);
    props.forEach((prop) => {
      item[prop] = document.getElementById(prop).value;
    })
    return item;
  }

  const addItemHandler = (event) => {
    event.preventDefault();
    const newItem = todoItemFromInputs();
    project.addTodo(newItem);
    modal.toggle();
  }

  const buildForm = () => {
    return buildElement({
      tag: "form",
      children: [
        { tag: "label", text: "title", attributes: { for: "title" } },
        { tag: "input", attributes: { type: "text", id: "title", name: "title" } },
        { tag: "label", text: "description", attributes: { for: "description" } },
        { tag: "input", attributes: { type: "text", id: "description", name: "description" } },
        { tag: "label", text: "Due Date", attributes: { for: "dueDate" } },
        { tag: "input", attributes: { type: "date", id: "dueDate", name: "dueDate" } },
        { tag: "label", text: "Priority", attributes: { for: "priority" } },
        { tag: "input", attributes: { type: "select", id: "priority", name: "priority" } },
      ]
    })
  }

  const render = () => {
    entryPoint.replaceChildren();

    const form = buildForm();

    const button = buildElement({
      tag: "button",
      text: "Add Item",
      attributes: { type: "button", "data-rerender": "" }
    })
    button.addEventListener("click", addItemHandler);
    form.appendChild(button);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(form);
    entryPoint.appendChild(fragment);
  }

  return { render };
}

export default function renderItemForm(parentProject) {
  createTodoItemForm(parentProject).render();
}
