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

const profilEditButton = document.querySelector(".profile__button-edit");
const editModal = document.querySelector("#edit-profile-modal");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const profileName = document.querySelector(".profile__title");
const profileDes = document.querySelector(".profile__description");
const modalInputName = editModal.querySelector("#profile-name-input");
const editmodalform = editModal.querySelector(".modal__form");
const modalInputDes = editModal.querySelector("#profile-description-input");

function openModal() {
  modalInputName.value = profileName.textContent;
  modalInputDes.value = profileDes.textContent;

  editModal.classList.add("modal_opened");
}

function closeModal() {
  editModal.classList.toggle("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalInputName.value;
  profileDes.textContent = modalInputDes.value;
  closeModal();
}

profilEditButton.addEventListener("click", openModal);
editModalCloseBtn.addEventListener("click", closeModal);
editmodalform.addEventListener("submit", handleEditFormSubmit);
