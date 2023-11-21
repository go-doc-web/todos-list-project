import "./styles/index.scss";
import "./index.html";

// Refs
import { refs } from "./utils/refs";
// Модель данных
import { data } from "./data/todo-db";
// Функция получения разметки
import { getTaskTemplate } from "./componets/getTaskTemplate";
// Function addTask add newTask
import { addTask } from "./utils/addTask";

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
  if (e.target === e.currentTarget || e.target.nodeName === "LI") return;
  // if (e.target.nodeName === "LI") return;

  const parent = e.target.closest("li");
  const actionEl = e.target.closest("[data-action]");
  const id = parent.dataset.id;
  const { action } = actionEl.dataset;

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
  }
};
refs.form.addEventListener("submit", handleSubmit);
refs.list.addEventListener("click", handleList);

window.addEventListener("keydown", handlePressEscape);
render();
