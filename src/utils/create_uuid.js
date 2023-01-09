// helper for creating a UUID
function createUUID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export default function createIdWrapper(data) {
  return {
    id: createUUID(),
    data,
  }
}
