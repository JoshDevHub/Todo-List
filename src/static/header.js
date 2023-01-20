import { buildElement } from "../utils/dom_helpers";
import menuIcon from "../icons/menu.svg";

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
          attributes: { class: "header__actions", "data-btn": "projects" },
          children: [
            { tag: "p", text: "Projects", },
            { tag: "svg", data: menuIcon },
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
