import "./styles/index.scss";
import "./index.html";

// Refs
import { refs } from "./componets/refs";
// Модель данных
import { data } from "./componets/todo-db";
// Функция получения разметки
import { getTaskTemplate } from "./componets/getTaskTemplate";
// Function addTask add newTask
import { addTask } from "./componets/addTask";

import { closeModal, openModal, handlePressEscape } from "./componets/modal";
import { getTaskTemplateFull } from "./componets/getTaskTemplateFull";

let items = data;

// Функция Рендер
const render = () => {
  refs.list.innerHTML = "";
  refs.list.insertAdjacentHTML("beforeend", getTaskTemplate(items));
};

const toggleComplited = (id) => {
  items = items.map((item) =>
    item.id === id ? { ...item, isDone: !item.isDone } : item
  );
  render();
  console.log(items);
};
const toggleImpotant = (id) => {
  items = items.map((item) =>
    item.id === id ? { ...item, isImpotant: !item.isImpotant } : item
  );
  render();
};
const viewTask = (id) => {
  const viewTask = items.find((item) => item.id === id);

  openModal();
  closeModal();
  const contentModal = document.querySelector(".content-modal");
  contentModal.innerHTML = "";
  contentModal.insertAdjacentHTML("beforeend", getTaskTemplateFull(viewTask));

  render();
};
const deleteTask = (id) => {
  items = items.filter((item) => item.id !== id);

  render();
};

const handleSubmit = (e) => {
  e.preventDefault();

  const title = e.target.elements.title.value;
  const text = e.target.elements.text.value;
  const isImpotant = e.target.elements.important.checked;

  items.push(addTask(title, text, isImpotant));

  render();
  refs.form.reset();
};

const handleList = (e) => {
  if (e.target === e.currentTarget) return;

  const parent = e.target.closest("li");
  const buttonParrent = e.target.closest("button");
  const { id } = parent.dataset;

  const { action } = buttonParrent.dataset;

  switch (action) {
    case "completed":
      toggleComplited(id);
      break;
    case "view":
      viewTask(id);
      break;
    case "delete":
      deleteTask(id);
      break;
    case "impotant":
      toggleImpotant(id);
      break;

    default:
      break;
  }
};

refs.form.addEventListener("submit", handleSubmit);
refs.list.addEventListener("click", handleList);

window.addEventListener("keydown", handlePressEscape);
render();
