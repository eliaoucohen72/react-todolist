export const getFromLocalStorage = () => localStorage.getItem("todos");
export const setToLocalStorage = (todos: Todo[]) => localStorage.setItem("todos");
