export default class Card {
  constructor( data, onCardClick, removeHandler, likeHandler, template, userId ) 
  {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._template = template;
    this._userId = userId;

    this._onCardClick = onCardClick;
    this._likeHandler = likeHandler;
    this._removeHandler = removeHandler;
  }
  // --- Get card template --- //
  _getTemplate() {
    const cardElement = this._template
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  _setAttributes(cardElement, attribs) {
    for (const key in attribs) {
      cardElement.setAttribute(key, attribs[key]);
    }
  }
  // --- Card deleting method --- //
  deleteCard() {
    const cardElement = document.getElementById(id);
    if(cardElement){
      cardElement.parentNode.removeChild(cardElement);
    }
    this._cardElement = null;
  }
  // ---  --- //
  _renderLikes () {
    this._likes.forEach((like) => 
      like._id === this._userId ? this._likeCard() : this._unlikeCard()
    );
  }
  // --- Show the like amount --- //
  showLikes(count){
    this._cardElement.querySelector('.card__like-count').textContent = count;
  }

  isLiked() {
    return this._liked;
  }

  _checkForLike(user) {
    if (this._likes.find((like) => like._id === user)) {
      this._liked = true;
    } 
    else {
      this._liked = false;
    }
    return this._liked;
  }

  // --- Set events listeners for the cards that will be created! --- //
  _setEventListeners() {
    this._cardElement
      .querySelector('.card__like-button')
      .addEventListener("click", (event) => {
        this._likeCard(event);
      });

    this._cardElement
      .querySelector('.card__delete-button')
      .addEventListener("click", () => {
        this._removeHandler(this._id);
      });

    this._cardElement
      .querySelector('.card__image')
      .addEventListener("click", () => {
        this._onCardClick(this._name, this._link);
      });
  }

  _showDeleteIcon() {
    if(this._userId != this._ownerId) {
      this._cardElement.querySelector('.card__delete-button').classList.add('card__delete-button_hidden');
    }
  }

  getCardId() {
    return this._id;
  }

  // --- Creating the card and card elements --- //
  generateCard() {
    this._cardElement = this._getTemplate();
    this.likeIcon = this._cardElement.querySelector('.card__like-button');
    this._setAttributes(this._cardElement.querySelector('.card__image'), {
      src: this._link,
      alt: this._name
    });
    this._cardElement.querySelector('.card__title').textContent = this._name;

    this._showDeleteIcon();
    this.showLikes(this._likes.length);
    this._setEventListeners();
    this._renderLikes();

    return this._cardElement;
  }

  _likeCard() {
    this.likeIcon.classList.add('card__like-button_active');
  }

  _unlikeCard() {
    this.likeIcon.classList.remove('card__like-button_active');
  }

  updateCard() {
    this._likes = data.likes;

    if (this._checkForLike(user.id)) {
      this._likeCard;
    }
    else {
      this._unlikeCard;
    }
    this._cardElement.querySelector('.card__like-count')
      .textContent = this._likes.length;
  }
}
