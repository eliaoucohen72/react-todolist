export const getFromLocalStorage = (key: string) => localStorage.getItem(key);

export const setToLocalStorage = (key: string, todos: Todo[]) =>
  localStorage.setItem(key, JSON.stringify(todos));
