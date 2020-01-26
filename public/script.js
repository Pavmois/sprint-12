const cardContainer = document.querySelector(".places-list");
// Cозданиe карточки
class Card {
    constructor(name, link) {
        this.card = this.createCard(name, link);
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    }

    createCard(name, link) {
        const placeCard = document.createElement('div');
        placeCard.classList.add('place-card');

        const cardImage = document.createElement('div');
        cardImage.classList.add('place-card__image');
        placeCard.appendChild(cardImage);
        cardImage.setAttribute('style', `background-image: url(${link})`);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('place-card__delete-icon');
        cardImage.appendChild(deleteButton);

        const cardDescription = document.createElement('div');
        cardDescription.classList.add('place-card__description');
        placeCard.appendChild(cardDescription);

        const cardName = document.createElement('h3');
        cardName.classList.add('place-card__name');
        cardName.textContent = name;
        cardDescription.appendChild(cardName);

        const likeButton = document.createElement('button');
        likeButton.classList.add('place-card__like-icon');
        cardDescription.appendChild(likeButton);

        return placeCard;
    }

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove(){
        this.card.parentNode.removeChild(this.card);
    }
};

// 10 карточек при загрузке страницы
class CardList {
    constructor(container, arr) {
        this.container = container;
        this.arr = arr;
        this.render();
    }

    render() {
        this.arr.forEach((arr) => {
            this.addCard(arr.name, arr.link);
        });
    }

    addCard(name, link) {
        const {card} = new Card(name, link);
        this.container.appendChild(card);
    }
}



//Формы открытия и закрытия карточек
class Popup {
    constructor(element, openClassName, closeButtonClassName) {
        this.element = element;
        this.openClassName = openClassName;
        const closeButton = this.element.querySelector(closeButtonClassName);
        this.close = this.close.bind(this);
        closeButton.addEventListener('click', this.close);
        closeButton.addEventListener('click', this.reset.bind(this));
        closeButton.addEventListener('click', this.profileError.bind(this));
    }
    open() {
        this.element.classList.add(this.openClassName);
    }
    close() {
        this.element.classList.remove(this.openClassName);
    }
    reset(){
        const newCardForm = document.forms.Cards;
        const places = newCardForm.elements.place;
        const links = newCardForm.elements.link;
        const plusButton = document.querySelector('.popup__button');
        places.value= '';
        links.value = '';
        if (places.value.length === 0 || links.value.length === 0) {
            plusButton.setAttribute('disabled', true);
            plusButton.classList.add('popup__button_disable');
        } else {
            plusButton.removeAttribute('disabled');
            plusButton.classList.remove('popup__button_disable');
        }
    }

    profileError() {
        event.preventDefault();
        profilePopup.close();
        document.Profile.name.value= document.querySelector('.user-info__name').textContent;
        document.Profile.about.value = document.querySelector('.user-info__job').textContent;
        const errorName = document.getElementById('error-name');
        errorName.textContent = '';
        errorName.parentNode.classList.remove('error');
        const errorAbout = document.getElementById('error-about');
        errorAbout.textContent = '';
        errorAbout.parentNode.classList.remove('error');
    }
}

const popup = new Popup(document.querySelector('.popup'), 'popup_is-opened', '.popup__close');
const profilePopup = new Popup(document.querySelector('.popup-profile'), 'popup-profile_is-opened', '.popup-profile__close');

const infoButton = document.querySelector('.user-info__button');

function openPopupForm(event) {
    event.preventDefault();
    popup.open();
}
infoButton.addEventListener('click', openPopupForm);

const editButton = document.querySelector('.user-info__edit');

const popupProfile = document.querySelector('.popup-profile');
const popupProfileClose = document.querySelector('.popup-profile__close');
function openPopupProfileForm(event) {
    event.preventDefault();
    profilePopup.open();
}
editButton.addEventListener('click', openPopupProfileForm);

//Просмотр картинки при нажатии на неё
const image = document.querySelector('.place-card__image');
const popupImage = document.querySelector('.popup-image');
const popupImageClose = document.querySelector('.popup-image__close');
let imgImage = document.querySelector('.popup-image__image');
let url = cardContainer.getAttribute('style');

function closeImage(event) {
    event.preventDefault();
    popupImage.classList.remove('popup-image_is-opened');
}

function showCard(event) {
    if (event.target.classList.contains('place-card__image')) {
        event.preventDefault();
        popupImage.classList.add('popup-image_is-opened');
        document.querySelector('.popup-image__image').src = event.target.style.backgroundImage.slice(5, -2);
    }
}

cardContainer.addEventListener('click', showCard);
popupImageClose.addEventListener('click', closeImage);

//Валидация полей ввода
const newCardForm = document.forms.Cards;
newCardForm.addEventListener('input', function (event) {
        const newCardForm = document.forms.Cards;
        const places = newCardForm.elements.place;
        const links = newCardForm.elements.link;
        const plusButton = document.querySelector('.popup__button');
    if (places.value.length === 0 || links.value.length === 0) {
        plusButton.setAttribute('disabled', true);
        plusButton.classList.add('popup__button_disable');
    } else {
        plusButton.removeAttribute('disabled');
        plusButton.classList.remove('popup__button_disable');
    }
});

const form = document.forms.Profile;
form.addEventListener('input', function (event) {
    const form = document.forms.Profile;
    const name = form.elements.name;
    const about = form.elements.about;
    const addButton = document.querySelector('.popup-profile__button');
    const errorName = document.getElementById('error-name');
    const errorAbout = document.getElementById('error-about');
    if (!name.checkValidity() || !about.checkValidity()) {
        addButton.setAttribute('disabled', true);
        addButton.classList.add('popup-profile__button_disable');
    } else {
        addButton.removeAttribute('disabled');
        addButton.classList.remove('popup-profile__button_disable');

        errorName.textContent = '';
        errorName.parentNode.classList.remove('error');
    }

    // Проверка пункта "Имя" профиля
    if (name.value.length === 0) {
        errorName.textContent = 'Это обязательное поле';
        errorName.parentNode.classList.add('error');
    } if (name.value.length === 1 || name.value.length > 30 ) {
        errorName.textContent = 'Должно быть от 2 до 30 символов';
        errorName.parentNode.classList.add('error');
    } else if (name.checkValidity()) {
        errorName.textContent = '';
        errorName.parentNode.classList.remove('error');
    }

    // Проверка пункта "О себе" профиля
    if (about.value.length === 0) {
        errorAbout.textContent = 'Это обязательное поле';
        errorAbout.parentNode.classList.add('error');
    } if (about.value.length === 1 || about.value.length > 30 ) {
        errorAbout.textContent = 'Должно быть от 2 до 30 символов';
        errorAbout.parentNode.classList.add('error');
    } else if (about.checkValidity()) {
        errorAbout.textContent = '';
        errorAbout.parentNode.classList.remove('error');
    }
});

//Добавление карточек по вкусу
const formName = document.querySelector('.popup__input_type_name');
const formLink = document.querySelector('.popup__input_type_link-url');
const popupButton = document.querySelector('.popup__button');

function submitCardHandler() {
    event.preventDefault();
    cardList.addCard(formName.value, formLink.value);
    popup.reset();
    popup.close();
}
newCardForm.addEventListener('submit', submitCardHandler);

  //Применение изменений в редактировании профиля
  const addButton = document.querySelector('.popup-profile__button');

  function submitData() {

      event.preventDefault();

      api.saveChange(document.querySelector('.popup-profile__input_type_name').value,
      document.querySelector('.popup-profile__input_type_about').value)
      .then(() => {
          document.querySelector('.user-info__name').textContent = document.querySelector('.popup-profile__input_type_name').value;
          document.querySelector('.user-info__job').textContent = document.querySelector('.popup-profile__input_type_about').value;
          popup.reset();
          profilePopup.close();
      })
      .catch((err) => console.log(err));
  }
  form.addEventListener('submit', submitData);

  function getProfile() {
    api.saveChange(document.querySelector('.popup-profile__input_type_name').value,
    document.querySelector('.popup-profile__input_type_about').value);
  }


//Серверная часть
class Api {
    constructor(option) {
    }

    //1. Загрузка информации о пользователе с сервера
    getUserInfo() {
        fetch('http://95.216.175.5/cohort5/users/me', {
            headers: {authorization: '16cff247-2cce-4ee4-a2da-c1f063b15055'}
        })
        .then(res => {if (res.ok) {return res.json();}
            return Promise.reject(`Ошибка загрузки информации о пользователе с сервера: ${res.status}`);
        })
        .then((result) => {
            console.log(result);
            document.querySelector('.user-info__name').textContent = result.name;
            document.querySelector('.user-info__job').textContent = result.about;
            // текущие данные профиля показываются в форме редактирования
            document.Profile.name.value = result.name;
            document.Profile.about.value = result.about;
        })
        .catch((err) => {console.log(err);
        });
    }

    //2. Загрузка первоначальных карточек с сервера
    getInitialCards() {
        fetch('http://95.216.175.5/cohort5/cards', {
            headers: { authorization: '16cff247-2cce-4ee4-a2da-c1f063b15055'}
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка загрузки карточек изображений с сервера: ${res.status}`);
          })
            .then((result) => {new CardList(cardContainer, result);
                console.log(result);
            })
           .catch((err) => {console.log(err);});
  }

    //3. Редактирование профиля
    saveChange(name, about){
        return fetch('http://95.216.175.5/cohort5/users/me', {
        method: 'PATCH',
        headers: {authorization: '16cff247-2cce-4ee4-a2da-c1f063b15055','Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name,
            about: about
        })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка загрузки данных профиля с сервера: ${res.status}`);
        })
        .then(() => {
            console.log('Если ты это видишь, значит всё отлично');
        });
    }
}

const api = new Api({
    baseUrl: 'http://95.216.175.5/cohort5',
    headers: {
      authorization: '16cff247-2cce-4ee4-a2da-c1f063b15055',
      'Content-Type': 'application/json'
    }
  });

  api.getUserInfo();
  api.getInitialCards();