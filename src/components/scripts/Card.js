export default class Card {
  constructor( 
    data, 
    onCardClick, 
    removeHandler, 
    likeClickHandler,
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
    this._likeClickHandler = likeClickHandler;
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
    if(this._userId === this._ownerId){
      this._card.remove();
      this._card = null;
    }
  }
  // --- Like handler --- //
  _handelLike(likeBtn) {
    likeBtn.classList.toggle('card__like-button_active')
  }
  // --- Check for all cards if liked or not --- //
  _likeStatus() {
    const likeBtn = this._cardElement.querySelector('.card__like-button');
    const likes = Array.from(this._likes);
    likes.forEach((element) => {
      if(element._id === this._userId){
        likeBtn.classList.add("card__like-button_active");
      }
    });
  }
  // --- Set events listeners for the cards that will be created! --- //
  _setEventListeners() {
    this._cardElement
      .querySelector('.card__like-button')
      .addEventListener("click", () => {
        this._likeClickHandler(this);
      });

    this._cardElement
      .querySelector('.card__delete-button')
      .addEventListener("click", () => {
        this._removeHandler(this);
      });

    this._cardElement
      .querySelector('.card__image')
      .addEventListener("click", () => {
        this._onCardClick(this._name, this._link);
      });
  }

  getCardId() {
    return this._cardId;
  }
  // --- Check if card owned by the user and add delete button --- //
  _checkOwnership(userId) {
    console.log(userId)
    if( userId === this._ownerId ){
      this._cardElement
        .querySelector('.card__delete-button')
        .classList.add("card__delete-button")
    }
    else{
      this._cardElement
        .querySelector('.card__delete-button')
        .classList.add("card__delete-button_hidden")
    }
  }
  // --- Creating the card and card elements --- //
  generateCard(userId) {
    this._cardElement = this._getTemplate();
    this._card = this._cardElement;

    this._setAttributes(this._cardElement
      .querySelector('.card__image'), {
        src: this._link,
        alt: this._name
    });
    this._cardElement
      .querySelector('.card__title').textContent = this._name;

    this._checkOwnership(userId);
    this._likeStatus();
    // --- Show like count --- //
    this._cardElement
      .querySelector('.card__like-count').textContent = this._likes.length;
    this._setEventListeners();

    return this._cardElement;
  }

  checkIfLiked(user) {
    if(this._likes.find((like) => like._id === user)) {
      this._liked = true;
    }
    else{
      this._liked = false;
    }

    return this._liked;
  }

  _cardLiked() {
    this._cardElement
      .querySelector('.card__like-button')
      .classList.add("card__like-button_active");
  }

  _cardUnliked() {
    this._cardElement
      .querySelector('.card__like-button')
      .classList.remove("card__like-button_active");
  }

  refreshCard(data, userId) {
    this._likes = data.likes;
    if(this.checkIfLiked(userId)) {
      this._cardLiked();
    }
    else {
      this._cardUnliked();
    }
    this._cardElement
      .querySelector('.card__like-count')
      .textContent = this._likes.length;
  }
}
