import "./styles/index.scss";
import "./index.html";

// Refs
import { refs } from "./utils/refs";
// Модель данных
// import { data } from "./data/todo-db";
// Функция получения разметки
import { getTaskTemplate } from "./componets/getTaskTemplate";
// Function addTask add newTask
import { addTask } from "./utils/addTask";
// Modal
import { closeModal, openModal, handlePressEscape } from "./componets/modal";
import { getTaskTemplateFull } from "./componets/getTaskTemplateFull";

// Api

import { fetchTodos } from "./api/apiTodos";
import { createTodos } from "./api/apiTodos";
import { updateTodos } from "./api/apiTodos";
import { deleteTodos } from "./api/apiTodos";

let items = [];

// Функция Рендер
const render = () => {
  refs.list.innerHTML = "";
  refs.list.insertAdjacentHTML("beforeend", getTaskTemplate(items));
};

const toggleComplited = (id) => {
  items = items.map((item) =>
    item.id === id ? { ...item, isDone: !item.isDone } : item
  );
  updateTodos(items);
  render();
};
const toggleImpotant = (id) => {
  items = items.map((item) =>
    item.id === id ? { ...item, isImpotant: !item.isImpotant } : item
  );
  updateTodos(items);
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
  deleteTodos(items);
  render();
};

const handleSubmit = (e) => {
  e.preventDefault();

  const title = e.target.elements.title.value;
  const text = e.target.elements.text.value;
  const isImpotant = e.target.elements.important.checked;

  items.push(addTask(title, text, isImpotant));
  createTodos(items);
  render();
  refs.form.reset();
};

const handleList = (e) => {
  if (e.target === e.currentTarget || e.target.nodeName === "LI") return;
  if (e.target.classList.contains("item-text")) return;

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
const loadTodos = () => {
  items = fetchTodos("todos");
};
// First load and first render
loadTodos();
render();
