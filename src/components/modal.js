import { buildElement } from "./dom_helpers";

class Modal {
  constructor() {
    this.modalOverlay = buildElement({ attributes: { class: "modal-overlay closed" } });
    this.modalBox = buildElement({ attributes: { class: "modal-box closed" } });
  }

  toggle() {
    this.modalOverlay.classList.toggle("closed");
    this.modalBox.classList.toggle("closed");
  }

  render() {
    document.body.appendChild(this.modalOverlay);
    document.body.appendChild(this.modalBox);
  }
}

const modal = new Modal();
export default modal;
