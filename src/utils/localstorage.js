// import { Notify } from "notiflix/build/notiflix-notify-aio";

export const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

export const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key);

    return serializedState === null ? [] : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
    return [];
  }
};

export const remove = (key) => {
  try {
    const serializedState = localStorage.removeItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};
