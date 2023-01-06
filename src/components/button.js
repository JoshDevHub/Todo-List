import { buildElement } from "./dom_helpers";

export default class Button {
  constructor(textContent, handler) {
    this.textContent = textContent;
    this.handler = handler;
  }

  #domTree() {
    return buildElement({
      tag: "button",
      text: this.textContent,
      attributes: { class: "btn" },
      events: {
        type: "click",
        handler: this.handler
      }
    })
  }

  render(attachPoint = document.body) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this.#domTree());

    attachPoint.appendChild(fragment);
  }
}
