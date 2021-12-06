export class Card {
  constructor({cardData, isLiked, isOwner, onCardClick, removeHandler, likeHandler}, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._ownerId = cardData.owner._id;
    this._likes = cardData.likes;
    this._likesCount = cardData.likes.length;
    this._cardSelector = cardSelector;

    this._onCardClick = onCardClick;
    this._onCardClick = this._onCardClick.bind(this);
    this._likeHandler = likeHandler;
    this._clickLikeHandler = this._clickLikeHandler.bind(this);
    this._removeHandler = removeHandler;
    this._removeHandler = this._removeHandler.bind(this);

    this._isLiked = isLiked;
    this._isLiked = this._isLiked.bind(this);
    this._isOwner = isOwner;
    this._isOwner = this._isOwner.bind(this);
  }
  // --- Getting the template --- //
  _getTemplate() {
    const card = document
      .querySelector("#card__template")
      .content.querySelector(".card")
      .cloneNode(true);
    return card;
  }

  // --- Set the likes amount of a card --- //
  likesAmountSet(likesCount) {
    this._item.querySelector('.card__like-count').textContent = likesCount;
  }

  // --- Toggle like button method --- //
  _likeCard(event) {
    const likeElement = this._item.querySelector('card__like');
    likeElement.classList.toggle("card__like-button_active");
    this._likeHandler(this);
    event.stopImmediatePropogation();
  }
  // --- Card deleting method --- //
  deleteCard() {
    this._item.remove();
    this._item = null 
  }
  // --- The card deleting event handler --- //
  _deleteCardHandler(event) {
    event.stopImmediatePropagation();
    this._deleteCardHandler(this._id, this);
  }
  
  // --- Set events listeners for the cards that will be created! --- //
  _setEventListeners() {
    this._item
      .querySelector(".card__like-button")
      .addEventListener("click", (event) => {
        this._likeCard(event);
      });

    this._item
      .querySelector(".card__delete-button")
      .addEventListener("click", (event) => {
        this._deleteCardHandler(event);
      });

    this._cardImage
      .addEventListener("click", (event) => {
        this._onCardClick(event);
      });
  }

  // --- Creating the card and card elements --- //
  generateCard() {
    this._item = this._getTemplate();

    if (this._isLiked(this._likes) === true) {
      this._element.querySelector('.card__like-button').classList.add('card__like_active');
    } 
    else {
      this._element.querySelector('.card__like-button').classList.remove('card__like_active');
    }

    if (this._isOwner(this._ownerId) !== true) {
      this._element.querySelector('.card__delete-button').classList.add('card__delete-button_hidden');
    }

    this._cardImage = this._item
      .querySelector(".card__image");
    this._setEventListeners();
    this._item
      .querySelector(".card__title")
      .textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = 'Image of '+` ${this._name} `;

    this._setEventListeners();

    return this._item;
  }

  getID() {
    return this._id;
  }
}