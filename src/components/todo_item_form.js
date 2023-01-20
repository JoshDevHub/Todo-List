import { buildElement } from "../utils/dom_helpers";
import modal from "./modal";
import TodoItem from "../lib/todo_item";

const createTodoForm = (todoItem) => {
  const entryPoint = document.querySelector(".modal-box");

  const createFormElement = () => {
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

  const fillInItemValues = () => {
    for (const [prop, value] of Object.entries(todoItem)) {
      const inputElement = document.getElementById(prop);
      inputElement.value = value ?? "";
    }
  }

  const render = () => {
    entryPoint.replaceChildren();

    const form = createFormElement();
    const fragment = document.createDocumentFragment();
    fragment.appendChild(form);
    entryPoint.appendChild(fragment);

    fillInItemValues();
  }

  return { render };
}

const renderNewItemForm = (parentProject) => {
  const newItem = new TodoItem();
  createTodoForm(newItem).render();
  const form = document.querySelector("form");

  const addItemHandler = () => {
    const props = Object.keys(newItem);
    props.forEach((prop) => {
      newItem[prop] = document.getElementById(prop).value;
    })
    parentProject.addTodo(newItem);
    modal.toggle();
  }

  const button = buildElement({
    tag: "button",
    text: "Add Item",
    attributes: { type: "button", "data-rerender": "currentProject" }
  })
  button.addEventListener("click", addItemHandler);
  form.appendChild(button);
}

const renderEditItemForm = (item) => {
  createTodoForm(item).render();
  const form = document.querySelector("form");

  const editItemHandler = () => {
    const props = Object.keys(item);
    props.forEach((prop) => {
      item[prop] = document.getElementById(prop).value;
    })
    modal.toggle();
  }

  const button = buildElement({
    tag: "button",
    text: "Edit Item",
    attributes: { type: "button", "data-rerender": "currentProject" }
  })
  button.addEventListener("click", editItemHandler);
  form.appendChild(button);
}

export { renderNewItemForm, renderEditItemForm };
