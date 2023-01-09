import pubsub from "../components/pubsub";
import createIdWrapper from "../utils/create_uuid";

// class for holding a single list of todo items
export default class Project {
  #todoList;

  constructor(name = "Todo List") {
    this.name = name;
    this.#todoList = [];
  }

  get todoList() {
    return [...this.#todoList];
  }

  addTodo(item) {
    const newItem = createIdWrapper(item);
    this.#todoList.push(newItem);
    pubsub.publish("updateProject");
  }

  removeTodo(index) {
    this.#todoList.splice(index, 1);
  }
}
