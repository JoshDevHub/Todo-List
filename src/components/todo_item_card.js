import { buildElement } from "../utils/dom_helpers";

import clockIcon from "../icons/clock-outline.svg";
import editIcon from "../icons/pencil-outline.svg";
import deleteIcon from "../icons/delete-outline.svg";

const createTodoItemCard = (item, id, cardContainer) => {
  const todoItem = item;
  const domId = id;

  const buildCardStructure = () => {
    return {
      tag: "section",
      attributes: { class: `todo-card ${todoItem.priority}` },
      children: [
        { tag: "h3", text: todoItem.title },
        {
          children: {
            children: [
              {
                tag: "p",
                text: todoItem.description,
                attributes: { class: "todo-card__description" } },
              {
                attributes: { class: "todo-card__due-date" },
                children: [
                  { tag: "svg", data: clockIcon },
                  { tag: "p", text: todoItem.stringDate() }
                ]
              },
            ]
          }
        },
        {
          attributes: { class: "todo-card__actions" },
          children: [
            {
              tag: "button",
              attributes: {
                class: "todo-card__edit",
                "data-btn": "edit-todo",
                /* "data-id": domId, */
                value: domId,
                "data-rerender": "currentProject"
              },
              children: { tag: "svg", data: editIcon },
            },
            {
              tag: "button",
              attributes: {
                "data-btn": "delete",
                /* "data-id": domId, */
                value: domId,
                "data-rerender": "currentProject"
              },
              children: { tag: "svg", data: deleteIcon },
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
