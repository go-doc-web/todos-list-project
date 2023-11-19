import { refs } from "../utils/refs";

export const closeModal = () => {
  const btnCloseModal = document.querySelector(".btn-close-modal");

  btnCloseModal.addEventListener("click", () => {
    document.body.classList.remove("show-modal");
  });
};

export const handlePressEscape = ({ code }) => {
  if (code !== "Escape") {
    return;
  }

  if (!refs.body.classList.contains("show-modal")) {
    window.removeEventListener("keydown", handlePressEscape);
  }

  document.body.classList.remove("show-modal");
};

export const openModal = () => {
  refs.body.classList.add("show-modal");
};
