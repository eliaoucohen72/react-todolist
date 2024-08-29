import { Todo } from "./interfaces";

export const getFromLocalStorage = (key: string) => localStorage.getItem(ke);

export const setToLocalStorage = (todos: Todo[]) =>
  localStorage.setItem("todos", JSON.stringify(todos));
