import { buildElement } from "../utils/dom_helpers";

const headerContent = {
  tag: "header",
  children: {
    tag: "h1",
    text: "Todo List"
  }
}

export default function renderHeader() {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(
    buildElement(headerContent)
  )

  document.body.appendChild(fragment);
}
