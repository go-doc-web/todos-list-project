import { nanoid } from "nanoid";

export const addTask = (title, text, isImpotant) => {
  const newTask = {
    id: nanoid(),
    title,
    text,
    isDone: false,
    isImpotant,
  };

  return newTask;
};
