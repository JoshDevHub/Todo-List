const PRIORITIES = Object.freeze(
  [
    "low",
    "medium",
    "high"
  ]
)

// class for a single item in a todo list
export default class TodoItem {
  #finished = false;

  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority ?? PRIORITIES[0];
  }

  isFinished() {
    return this.#finished;
  }

  toggleFinishedStatus() {
    this.#finished = !this.#finished;
  }

  stringDate() {
    return this.dueDate || "--/--/--";
  }

  listPriorityOptions() {
    return PRIORITIES;
  }
}
