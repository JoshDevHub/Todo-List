// class for a single item in a todo list
export default class TodoItem {
  constructor(title, description, dueDate, priority) {
    this.title = title ?? undefined;
    this.description = description ?? undefined;
    this.dueDate = dueDate ?? undefined;
    this.priority = priority ?? undefined;
  }
}
