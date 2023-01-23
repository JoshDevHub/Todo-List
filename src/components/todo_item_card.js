import { buildElement } from "../utils/dom_helpers";

const createTodoItemCard = (item, id, cardContainer) => {
  const todoItem = item;
  const domId = id;

  const buildCardStructure = () => {
    return {
      tag: "section",
      attributes: { class: `todo-card ${todoItem.priority}`, },
      children: [
        { tag: "h3", text: todoItem.title },
        {
          children: [
            { tag: "p", text: todoItem.description },
            { tag: "p", text: todoItem.dueDate },
          ]
        },
        {
          children: [
            {
              tag: "button",
              text: "Edit",
              attributes: {
                "data-btn": "edit-todo",
                "data-id": domId,
                "data-rerender": "currentProject"
              }
            },
            {
              tag: "button",
              text: "delete",
              attributes: {
                "data-btn": "delete",
                "data-id": domId,
                "data-rerender": "currentProject"
              }
            }
          ]
        }
      ],
    }
  }

  const render = () => {
    const card = buildElement(buildCardStructure());
    cardContainer.appendChild(card);
  }

  return { render }
}

export default function renderTodoItemCard(item, id, cardContainer) {
  createTodoItemCard(item, id, cardContainer).render();
}
