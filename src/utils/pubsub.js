class Pubsub {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, ...actions) {
    this.events[eventName] = this.events[eventName] || [];
    actions.forEach((action) => this.events[eventName].push(action));
  }

  publish(eventName, data) {
    this.events[eventName]?.forEach((fn) => fn(data));
  }
}

const pubsub = new Pubsub();
export default pubsub;
