const createUUID = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const createIdWrapper = (data) => {
  return {
    id: createUUID(),
    data
  }
}

export default class Collection {
  #collection

  constructor(...items) {
    this.#collection = items.map(createIdWrapper);
  }

  get collection() {
    return [...this.#collection];
  }

  get size() {
    return this.#collection.length
  }

  each(callback) {
    this.#collection.forEach(callback);
  }

  isEmpty() {
    return this.size === 0;
  }

  add(item) {
    const newItem = createIdWrapper(item);
    this.#collection.push(newItem);
  }

  findBy(id) {
    return this.#collection.find((item) => item.id === id).data;
  }

  deleteItemWith(id) {
    this.#collection = this.#collection.filter((item) => item.id !== id);
  }
}
