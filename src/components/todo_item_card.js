import { buildElement } from "../utils/dom_helpers";

const createTodoItemCard = (item, cardContainer) => {
  const todoItem = item;

  const buildCardStructure = () => {
    return {
      tag: "section",
      children: [
        { tag: "h3", text: todoItem.title },
        {
          children: [
            { tag: "p", text: todoItem.description },
            { tag: "p", text: todoItem.dueDate },
            { tag: "p", text: todoItem.priority },
          ]
        },
      ],
    }
  }

  const render = () => {
    const card = buildElement(buildCardStructure());
    cardContainer.appendChild(card);
  }

  return { render }
}

export default function renderTodoItemCard(item, cardContainer) {
  createTodoItemCard(item, cardContainer).render();
}
