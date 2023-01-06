import { buildElement } from "./dom_helpers";
import Button from "./button";

export default class Modal {
  constructor() {
    this.modalOverlay = buildElement({ attributes: { class: "modal-overlay closed" } });
    this.modalBox = buildElement({ attributes: { class: "modal-box closed" } });
  }

  toggle() {
    const overlay = this.modalOverlay ?? document.querySelector(".modal-overlay");
    const box = this.modalBox ?? document.querySelector(".modal-box");
    overlay.classList.toggle("closed");
    box.classList.toggle("closed");
  }

  render() {
    if (document.querySelector(".modal-overlay")) return;

    new Button("Cancel", this.toggle).render(this.modalBox);

    document.body.appendChild(this.modalOverlay);
    document.body.appendChild(this.modalBox);
  }
}
