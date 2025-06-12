import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import "./index.css";
import avatar from "../images/avatar.jpg";
import white_pencil from "../images/white_pencil.png";
import button from "../images/Group_2.svg";
import Group_26 from "../images/Group_26.svg";
import Logo from "../images/logo.svg";
import Api from "../utils/Api.js";
import { data } from "autoprefixer";
import { setButtonText } from "../utils/helper.js";

const avatarPicture = document.getElementById("profile__avatar");
avatarPicture.src = avatar;

const avatarEditIcon = document.getElementById("pencil-icon");
avatarEditIcon.src = white_pencil;

const buttonPicture = document.getElementById("profile__button");
buttonPicture.src = button;

const Group_26button = document.getElementById("new__picture");
Group_26button.src = Group_26;

const logo = document.getElementById("logo");
logo.src = Logo;

const api = new Api("https://around-api.en.tripleten-services.com/v1", {
  authorization: "97b5d94e-2030-4e5f-8d5a-22aeac9eb64c",
  "Content-Type": "application/json",
});

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

//Avatar Modal elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarModalOpenBtn = document.querySelector(".profile__avatar-btn");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close");
const avatarModalForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

//Delete form Elements
const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close");
const deleteModalCancelBtn = deleteModal.querySelector(".modal__btn--cancel");
const deleteModalForm = deleteModal.querySelector(".modal__form");
const deleteSubmitBtn = deleteModal.querySelector(".modal__delete-btn");

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

let selectedCard;
let selectedCardId;

api
  .getAppInfo()
  .then(([cards, user]) => {
    cards.forEach((card) => {
      const cardEL = getCardElement(card);
      cardsList.append(cardEL);
    });
    profileName.textContent = user.name;
    profileDes.textContent = user.about;
    avatarPicture.src = user.avatar;
  })
  .catch(console.error);

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

  function handleLike(evt, id) {
    const isLiked = cardLikeBtn.classList.contains("card__like-button_liked");
    if (!isLiked) {
      api
        .handleLike(id, false)
        .then(() => {
          evt.target.classList.add("card__like-button_liked");
        })
        .catch(console.error);
    } else
      api
        .handleLike(id, true)
        .then(() => {
          evt.target.classList.remove("card__like-button_liked");
        })
        .catch(console.error);
  }

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-button_liked");
  }
  cardLikeBtn.addEventListener("click", (evt) => handleLike(evt, data._id));

  cardDeleteBtn.addEventListener("click", (evt) =>
    handleDeleteCard(cardElement, data._id)
  );

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
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api
    .editUserInfo({ name: modalInputName.value, about: modalInputDes.value })
    .then((data) => {
      profileName.textContent = data.name;
      profileDes.textContent = data.about;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api
    .addNewCard({ name: cardCaptionInput.value, link: cardLinkInput.value })
    .then((data) => {
      const cardEl = getCardElement(data);
      cardsList.prepend(cardEl);
      closeModal(cardModal);
      evt.target.reset();
      disableButton(cardSubmitBtn, settings);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      closeModal(avatarModal);
      avatarPicture.src = data.avatar;
      console.log(data.avatar);
      evt.target.reset();
      disableButton(avatarSubmitBtn, settings);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Deleting...", "Delete");
  api
    .deleteCard(selectedCardId)
    .then((data) => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)

    .finally(() => {
      setButtonText(submitBtn, false, "Deleting...", "Delete");
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
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

avatarModalOpenBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarModalCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

cardModalPostBtn.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

deleteModalCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteModalCancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteModalForm.addEventListener("submit", handleDeleteSubmit);

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
avatarModalForm.addEventListener("submit", handleAvatarSubmit);

enableValidation(settings);
