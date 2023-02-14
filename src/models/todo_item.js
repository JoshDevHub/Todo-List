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

  static fromJSON(data) {
    const props = JSON.parse(data);
    const todoItem = new TodoItem(
      props.title, props.description, props.dueDate, props.priority
    )
    if (props.finished) todoItem.toggleFinishedStatus;

    return todoItem;
  }

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

  serialize() {
    return JSON.stringify({
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      finished: this.#finished
    })
  }
}
