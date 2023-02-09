import Collection from "../utils/collection";

// class for holding a single list of todo items
export default class Project {
  #todoList;

  constructor(name) {
    this.name = name;
    this.#todoList = new Collection();
  }

  get todoList() {
    return this.#todoList.collection;
  }

  size() {
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
      return { id: todo.id, data: todo.data.serialize() }
    })

    return JSON.stringify({
      name: this.name,
      todoList: serializedList
    })
  }
}
