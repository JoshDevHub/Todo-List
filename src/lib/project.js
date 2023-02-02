import createIdWrapper from "../utils/create_uuid";

// class for holding a single list of todo items
export default class Project {
  #todoList;

  constructor(name) {
    this.name = name;
    this.#todoList = [];
  }

  get todoList() {
    return [...this.#todoList];
  }

  get size() {
    return this.#todoList.length;
  }

  isEmpty() {
    return this.#todoList.length === 0;
  }

  addTodo(item) {
    const newItem = createIdWrapper(item);
    this.#todoList.push(newItem);
  }

  findBy(id) {
    return this.#todoList.find((todo) => todo.id === id).data;
  }

  deleteItemWith(id) {
    this.#todoList = this.#todoList.filter((item) => item.id !== id);
  }
}
