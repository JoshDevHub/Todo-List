import { buildElement } from "../utils/dom_helpers";

const createTodoItemCard = (item, id, cardContainer) => {
  const todoItem = item;
  const domId = id;

  const buildCardStructure = () => {
    return {
      tag: "section",
      attributes: { class: `todo-card ${todoItem.priority}`, "data-toggle": "accordion" },
      children: [
        { tag: "h3", text: todoItem.title },
        {
          children: {
            attributes: { class: "accordion" },
            children: [
              { tag: "p", text: todoItem.description },
              { tag: "p", text: `Due: ${todoItem.stringDate()}` },
              {
                tag: "p",
                text: "Priority: ",
                children: {
                  tag: "span",
                  attributes: { class: todoItem.priority },
                  text: todoItem.priority
                }
              },
            ]
          }
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
