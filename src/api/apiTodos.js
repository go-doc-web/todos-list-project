import { load } from "../utils/localstorage";
import { save } from "../utils/localstorage";

export const fetchTodos = (key) => {
  const data = load(key);
  return data;
};

export const createTodos = (payload) => {
  save("todos", payload);
};
export const updateTodos = (payload) => {
  save("todos", payload);
};
export const deleteTodos = (payload) => {
  save("todos", payload);
};
