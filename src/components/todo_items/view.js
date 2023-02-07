import { buildElement } from "../../utils/dom_helpers";

import { clockIcon, editIcon, deleteIcon } from "../../icons/manifest";

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
              {
                children: [
                  { tag: "label", text: "Finished?" },
                  {
                    tag: "input",
                    attributes: {
                      type: "checkbox",
                      value: id,
                      "data-toggle-finish": "",
                    },
                    checked: todoItem.isFinished()
                  },
                ]
              }
            ]
          }
        },
        {
          attributes: { class: "todo-card__actions" },
          children: [
            {
              tag: "button",
              attributes: {
                class: "btn btn--edit",
                "data-btn": "edit-todo",
                value: domId,
                "data-rerender": "currentProject"
              },
              children: { tag: "svg", data: editIcon },
            },
            {
              tag: "button",
              attributes: {
                class: "btn btn--delete",
                "data-btn": "delete",
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

export default function renderTodoItem(item, id, cardContainer) {
  createTodoItemCard(item, id, cardContainer).render();
}
