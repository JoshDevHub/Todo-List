// entry point script

import "./styles/reset.css";
import "./styles/app.css";

import renderHeader from "./components/header";
import Modal from "./components/modal";
import Button from "./components/button";

const modal = new Modal();

renderHeader();
modal.render();

const addTodoHandler = () => {
  modal.toggle();
}

new Button("Add Todo", addTodoHandler).render();
