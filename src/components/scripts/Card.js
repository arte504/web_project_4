export class Card {
  constructor(
    { cardData, user, onCardClick, removeHandler, likeHandler },
    cardSelector
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData._id;
    this._ownerId = cardData.owner._id;
    this._userID = user;
    this._likes = cardData.likes;
    this._cardSelector = cardSelector;

    this._onCardClick = onCardClick;
    this._likeHandler = likeHandler;
    this._removeHandler = removeHandler;
  }
  // --- Getting the template --- //
  _getTemplate() {
    const card = document
      .querySelector("#card__template")
      .content.querySelector(".card")
      .cloneNode(true);
    return card;
  }

  // --- Card deleting method --- //
  deleteCard() {
    this._item.remove();
    this._item = null;
  }

  _renderLikes() {
    if (this.isLiked()) {
      this._item
        .querySelector(".card__like-button")
        .classList.add("card__like-button_active");
    } else {
      this._item
        .querySelector(".card__like-button")
        .classList.remove("card__like-button_active");
    }
    this._item.querySelector(".card__like-counter").textContent =
      this._likes.length;
  }

  // --- Check if card liked by another user --- //
  isLiked() {
    return this._likes.some((user) => user._id === this._userId);
  }

  // --- Toggle like button method --- //
  updateLikes(newLikes) {
    this._likes = newLikes;
    this._renderLikes();
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
      .addEventListener("click", () => {
        this._removeHandler(this._cardId);
      });

    this._cardImage.addEventListener("click", (event) => {
      this._onCardClick(event);
    });
  }

  // --- Creating the card and card elements --- //
  generateCard() {
    this._item = this._getTemplate();

    if (this._ownerId !== this._userId) {
      this._element
        .querySelector(".card__delete-button")
        .classList.add("card__delete-button_hidden");
    }

    this._cardImage = this._item.querySelector(".card__image");
    this._item.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = "Image of " + ` ${this._name} `;
    this._renderLikes();

    this._setEventListeners();

    return this._item;
  }
}
