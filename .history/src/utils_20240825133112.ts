import { Todo } from "./interfaces";

export const getFromLocalStorage = (key: string) => localStorage.getItem(key);

export const setToLocalStorage = (todos: Todo[]) =>
  localStorage.setItem("todos", JSON.stringify(todos));
