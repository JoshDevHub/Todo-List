import { buildElement } from "../utils/dom_helpers";

const headerContent = {
  tag: "header",
  children: [
    {
      attributes: { class: "header__wrapper" },
      children: [
        {
          attributes: { class: "header__icon" },
          children: [
            { tag: "h1", text: "Todo List" }
          ]
        },
        {
          attributes: { class: "header__actions" },
          children: [
            { tag: "button", text: "Projects", attributes: { "data-btn": "projects" } },
          ]
        }
      ]
    }
  ]
}

export default function renderHeader() {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(
    buildElement(headerContent)
  )

  document.body.appendChild(fragment);
}
