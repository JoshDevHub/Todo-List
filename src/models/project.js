import Collection from "../utils/collection";
import TodoItem from "./todo_item";

// class for holding a single list of todo items
export default class Project {
  #todoList;

  static fromJSON(data) {
    const { name, todoList } = JSON.parse(data);
    return new Project(
      name,
      todoList.map(TodoItem.fromJSON)
    )
  }

  constructor(name, todoItems = []) {
    this.name = name;
    this.#todoList = new Collection(...todoItems);
  }

  get todoList() {
    return this.#todoList.collection;
  }

  get size() {
    return this.#todoList.size
  }

  isEmpty() {
    return this.#todoList.isEmpty();
  }

  addTodo(item) {
    this.#todoList.add(item);
  }

  findBy(id) {
    return this.#todoList.findBy(id);
  }

  toggleFinishFor(id) {
    this.findBy(id).toggleFinishedStatus();
  }

  deleteItemWith(id) {
    this.#todoList.deleteItemWith(id);
  }

  serialize() {
    const serializedList = this.todoList.map((todo) => {
      return todo.data.serialize();
    })

    return JSON.stringify({
      name: this.name,
      todoList: serializedList
    })
  }
}
