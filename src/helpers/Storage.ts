export function getStorageState<T>(key: string): T | null {
  try {
    const JsonState = localStorage.getItem(key);
    if (!JsonState) {
      return null;
    }
    return JSON.parse(JsonState);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function setStorageState<T>(state: T, key: string): void {
  const stringState = JSON.stringify(state);
  localStorage.setItem(key, stringState);
}
