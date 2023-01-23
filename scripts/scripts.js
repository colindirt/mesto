const popup = document.querySelector ('.popup');
const editButton = document.querySelector ('.profile__edit-button');
const closeButton = document.querySelector ('.popup__close');
let formElement = document.querySelector ('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupToggle = function() {
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener ('click', popupToggle);

closeButton.addEventListener ('click', popupToggle);

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupToggle();
}

formElement.addEventListener('submit', handleFormSubmit);
