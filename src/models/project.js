import Collection from "../utils/collection";
import TodoItem from "./todo_item";

// class for holding a single list of todo items
export default class Project {
  #name;
  #todoList;
  #observers = {};

  static fromJSON(data) {
    const { name, todoList } = JSON.parse(data);
    return new Project(
      name,
      todoList.map(TodoItem.fromJSON)
    )
  }

  constructor(name, todoItems = []) {
    this.#name = name;
    this.#todoList = new Collection(...todoItems);
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
    this.publish("updateName", this);
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
    this.publish("updateState");
  }

  findBy(id) {
    return this.#todoList.findBy(id);
  }

  toggleFinishFor(id) {
    this.findBy(id).toggleFinishedStatus();
  }

  updateTodo(id, updateFunction) {
    const todo = this.findBy(id);
    updateFunction(todo);

    this.publish("updateState");
  }

  deleteItemWith(id) {
    this.#todoList.deleteItemWith(id);
    this.publish("updateState");
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

  subscribe(eventName, listenerFunction) {
    this.#observers[eventName] ??= [];
    this.#observers[eventName].push(listenerFunction);
  }

  publish(eventName, data = null) {
    this.#observers[eventName]?.forEach((listener) => {
      listener(data);
    })
  }
}
