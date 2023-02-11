const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_card');
const popupFullImg = document.querySelector('.popup_type_img');
const popups = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close');
const addButton = document.querySelector('.profile__add-button');
let formProfile = document.querySelector('.popup__form_profile');
let formCard = document.querySelector('.popup__form_card');
let nameInput = formProfile.querySelector('.popup__input_type_name');
let jobInput = formProfile.querySelector('.popup__input_type_job');
let inputDescription = formCard.querySelector('.popup__input_type_name');
let inputLink = formCard.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupImg = document.querySelector('.popup__img');
const popupImgDescription = document.querySelector('.popup__description');
const cardTemplate = document.querySelector('#card').content;
const elements = document.querySelector('.elements');
const titleElement = document.querySelector('.element__title');
const imageElement = document.querySelector('.element__image');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const openEditProfile = function() {
  openPopup(popupEditProfile)
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener ('click', openEditProfile);

closeButton.forEach(buttonClose => {
  buttonClose.addEventListener('click', closeButtonClick)
})

function closeButtonClick() {
  closePopup(popupEditProfile)
  closePopup(popupAddCard)
  closePopup(popupFullImg)
}



function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile)
}

formProfile.addEventListener('submit', handleFormSubmit);

addButton.addEventListener('click', () => openPopup(popupAddCard))

const handleCardForm = function (evt) {
  evt.preventDefault()
  const cardDescription = inputDescription.value;
  const cardLink = inputLink.value;
  renderCards(cardDescription, cardLink, elements);
  evt.target.reset()
  closePopup(popupAddCard)
}

formCard.addEventListener('submit', handleCardForm);

const likeToggle = (evt) => evt.target.classList.toggle('element__like-button_active');

const deleteCard = (evt) => evt.target.closest(".element").remove();

const addCard = (cardsName, cardsImage) => {
  const element = cardTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__img');
  const elementDescription = element.querySelector('.element__description');
  elementDescription.textContent = cardsName;
  elementImage.src = cardsImage;
  elementImage.alt = cardsImage;

  const likeButton = element.querySelector('.element__like-button');
  likeButton.addEventListener('click', likeToggle);

  const deleteButton = element.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  element.querySelector('.element__img').addEventListener('click', (evt) => {
    openPopup(popupFullImg)
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.closest('.element').querySelector('.element__description').textContent
    popupImgDescription.textContent = evt.target.closest('.element').querySelector('.element__description').textContent
  })

  return element;
}

const renderCards = (cardsName, cardsImage) => {
  elements.prepend(addCard(cardsName, cardsImage));
}

initialCards.forEach((initialCard) => {
  renderCards(initialCard.name, initialCard.link, elements);
});



