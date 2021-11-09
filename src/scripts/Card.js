export class Card {
  constructor(data, cardSelector, onCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._onCardClick = onCardClick;
  }
  // --- Getting the template --- //
  _getTemplate() {
    const card = document
      .querySelector("#card__template")
      .content.querySelector(".card")
      .cloneNode(true);
    return card;
  }
  // --- Creating the card and card elements --- //
  generateCard() {
    this._item = this._getTemplate();

    this._cardImage = this._item
      .querySelector(".card__image");
    this._setEventListeners();
    this._item
      .querySelector(".card__title")
      .textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = 'Image of '+` ${this._name} `;

    return this._item;
  }
  // --- Set events listeners for the cards that will be created! --- //
  _setEventListeners() {
    this._item
      .querySelector(".card__like-button")
      .addEventListener("click", (event) =>
      {this._likeCard(event);});

    this._item
      .querySelector(".card__delete-button")
      .addEventListener("click", (event) => 
      {this._deleteCard(event);});

    this._cardImage
      .addEventListener("click", (event) => 
      {this._onCardClick(event);});
  }
  // --- Toggle like button method --- //
  _likeCard(event) {
    event.preventDefault();
    const button = event.target;
    button.classList.toggle("card__like-button_active");
  }
  // --- Card deleting method --- //
  _deleteCard(event){
    event.preventDefault();
    let parentItem = event.currentTarget.closest(".card");
    parentItem.remove();
    parentItem = null;
  }
}