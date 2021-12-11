export default class Card {
  constructor( 
    data, 
    onCardClick, 
    removeHandler, 
    likeAddHandler, 
    likeRemoveHandler, 
    template, 
    userId ) 
  {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._userId = userId;

    this._template = template;
    this._onCardClick = onCardClick;
    this._likeAddHandler = likeAddHandler;
    this._likeRemoveHandler = likeRemoveHandler;
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
  // --- Show the like amount --- //
  showLikes(count){
    this._cardElement.querySelector('.card__like-count').textContent = count;
  }
  // --- Like handler --- //
  _handelLike(likeBtn) {
    likeBtn.classList.toggle('card__like-button_active')
  }
  // --- Set events listeners for the cards that will be created! --- //
  _setEventListeners() {
    this._cardLikeBtn = this._cardElement.querySelector('.card__like-button');
    this._cardLikeBtn
      .addEventListener("click", () => {
        if(!this._cardElement.classList.contains('card__like-button_active')) {
          this._likeAddHandler(this._cardId);
          this._handelLike(this._cardLikeBtn);
        }
        else {
          this._likeRemoveHandler(this._cardId);
          this._handelLike(this._cardLikeBtn);
        }
      })

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
    this._card = this._cardElement;

    this._setAttributes(this._cardElement.querySelector('.card__image'), {
      src: this._link,
      alt: this._name
    });
    this._cardElement.querySelector('.card__title').textContent = this._name;

    this._showDeleteIcon();
    this.showLikes(this._likes.length);
    this._setEventListeners();

    return this._cardElement;
  }
}
