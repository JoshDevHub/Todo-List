import renderHeader from "./header";
import { buildElement } from "../utils/dom_helpers";

export default function renderStaticComponents() {
  renderHeader();
  document.body.appendChild(
    buildElement({
      tag: "main"
    })
  );
}
