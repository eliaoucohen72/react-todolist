import {Todo} from "../interfaces";

export const getFromLocalStorage = (key: string) => localStorage.getItem(key);

export const saveToLocalStorage = (key: string, todos: Todo[]) =>
  localStorage.setItem(key, JSON.stringify(todos));
