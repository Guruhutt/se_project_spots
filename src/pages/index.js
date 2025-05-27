import { enableValidation, settings } from "../scripts/validation.js";
import "./index.css";
import avatar from "../images/avatar.jpg";
import button from "../images/Group_2.svg";
import Group_26 from "../images/Group_26.svg";

const avatarPicture = document.getElementById("profile__avatar");
avatarPicture.src = avatar;

const buttonPicture = document.getElementById("profile__button");
buttonPicture.src = button;

const Group_26button = document.getElementById("new__picture");
Group_26button.src = Group_26;

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
//Edit profile elements
const profilEditButton = document.querySelector(".profile__button-edit");
const profileName = document.querySelector(".profile__title");
const profileDes = document.querySelector(".profile__description");

//Edit profile Modal elements
const editModal = document.querySelector("#edit-profile-modal");
const editModalCloseBtn = editModal.querySelector(".modal__close");
const editModalForm = editModal.querySelector(".modal__form");

//Edit profile Modal input elements
const modalInputDes = editModal.querySelector("#profile-description-input");
const modalInputName = editModal.querySelector("#profile-name-input");

//Card Modal elements
const cardModal = document.querySelector("#new-post-modal");
const cardModalPostBtn = document.querySelector(".profile__button-add");
const cardModalCloseBtn = cardModal.querySelector(".modal__close");
const cardModalForm = cardModal.querySelector(".modal__form");
const cardSubmitBtn = cardModal.querySelector(".modal__submit-btn");

//card Modal input elements
const cardLinkInput = cardModal.querySelector("#image-link-input");
const cardCaptionInput = cardModal.querySelector("#image-caption-input");

//preview Modal
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const modals = document.querySelectorAll(".modal");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__description");
  const cardImages = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardNameEl.textContent = data.name;
  cardImages.src = data.link;
  cardImages.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_liked");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImages.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalInputName.value;
  profileDes.textContent = modalInputDes.value;
  closeModal(editModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: cardCaptionInput.value,
    link: cardLinkInput.value,
  };
  const cardEL = getCardElement(inputValues);
  cardsList.prepend(cardEL);
  closeModal(cardModal);
  evt.target.reset();
  disableButton(cardSubmitBtn, settings);
}

profilEditButton.addEventListener("click", () => {
  modalInputName.value = profileName.textContent;
  modalInputDes.value = profileDes.textContent;
  resetValidation(editModalForm, [modalInputName, modalInputDes], settings);
  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

editModalForm.addEventListener("submit", handleEditFormSubmit);

cardModalPostBtn.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

modals.forEach((modal) => {
  modal.addEventListener("click", function (evt) {
    if (
      modal.classList.contains("modal_opened") &&
      evt.target.classList.contains("modal")
    ) {
      closeModal(modal);
    }
  });
});

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closeModal(openedPopup);
  }
}

cardModalForm.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((card) => {
  const cardEL = getCardElement(card);
  cardsList.append(cardEL);
});

enableValidation(settings);
