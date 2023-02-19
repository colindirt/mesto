const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_card');
const popupFullImg = document.querySelector('.popup_type_img');
const popups = document.querySelectorAll('.popup');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const formProfile = document.querySelector('.popup__form_profile');
const formCard = document.querySelector('.popup__form_card');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_job');
const inputDescription = formCard.querySelector('.popup__input_type_name');
const inputLink = formCard.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupImg = document.querySelector('.popup__img');
const popupImgDescription = document.querySelector('.popup__description');
const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.elements');

const openEditProfile = function() {
  openPopup(popupEditProfile)
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEscape);
}

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEscape);
}

buttonEdit.addEventListener ('click', openEditProfile);

popups.forEach((item) => {
  item.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      closePopup(evt.currentTarget)
    }
  });
});

const closePopupOnEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile)
}

formProfile.addEventListener('submit', handleFormSubmit);

buttonAdd.addEventListener('click', () => openPopup(popupAddCard))

const handleCardForm = function (evt) {
  evt.preventDefault()
  disabledButtonElement(evt)
  const cardDescription = inputDescription.value;
  const cardLink = inputLink.value;
  renderCards(cardDescription, cardLink, cardsContainer);
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

  elementImage.addEventListener('click', (evt) => {
    openPopup(popupFullImg)
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.closest('.element').querySelector('.element__description').textContent
    popupImgDescription.textContent = evt.target.closest('.element').querySelector('.element__description').textContent
  })

  return element;
}

const renderCards = (cardsName, cardsImage) => {
  cardsContainer.prepend(addCard(cardsName, cardsImage));
}

initialCards.forEach((initialCard) => {
  renderCards(initialCard.name, initialCard.link, cardsContainer);
});

