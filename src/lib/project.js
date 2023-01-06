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
    this.#todoList.push(item);
  }

  removeTodo(index) {
    this.#todoList.splice(index, 1);
  }
}
