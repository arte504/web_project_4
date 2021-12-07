export default class Card {
  constructor( data, template, userId, 
    { onCardClick, removeHandler, likeHandler } ) 
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
      like._id === this._userId ? this.likeCard() : this.unlikeCard()
    );
  }
  // --- Show the like amount --- //
  showLikes(count){
    this._cardElement.querySelector('.card__like-count').textContent = count;
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

    this._cardElement.addEventListener("click", (event) => {
      this._onCardClick(event);
    });
  }

  _showDeleteIcon() {
    if(this._userId != this._ownerId) {
      this._cardElement.querySelector('.card__delete-button').classList.add('card__delete-button_hidden');
    }
  }

  isLiked() {
    return this.likeIcon.classList.contains('card__like-button_active');
  }

  // --- Creating the card and card elements --- //
  generateCard() {
    this._cardElement = this._getTemplate();
    this.likeIcon = this._cardElement.querySelector('.card__like-button');
    this._setAttributes(this._cardElement.querySelector('.card__image'), {
      src: this._image,
      alt: this._name
    });
    this._cardElement.querySelector('.card__title').textContent = this.name;

    this._showDeleteIcon();
    this.showLikes(this._likes.length);
    this._setEventListeners();
    this._renderLikes();

    return this._cardElement;
  }

  likeCard() {
    this.likeIcon.classList.add('card__like-button_active');
  }

  unlikeCard() {
    this.likeIcon.classList.remove('card__like-button_active');
  }
}
