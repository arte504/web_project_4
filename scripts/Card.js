import { openModal } from "./Modal.js";
import { cardBigModal, cardBigModalImage, cardBigModalText } from "./Utils.js";

export class Card {
  constructor(text, image, cardSelector) {
    this._text = text;
    this._image = image;
    this._cardSelector = cardSelector;
  }
  /* Getting the template from HTML file/class */
  _getTemplate() {
    const cardElem = document
      .querySelector(".card__template")
      .content.querySelector(".card")
      .cloneNode(true);
    /* Return the template of the card */
    return cardElem;
  }
  /* Set card elements and create the card */
  createCard() {
    this._elem = this._getTemplate(); /* Take template */
    this._cardImage = this._elem.querySelector(".card__image"); /* Get image class */
    this._setEventListeners(); /* Set events listeners */
    this._cardImage.src = this._image; /* Set image */
    this._cardImage.alt = this._text; /* Set image alt */
    this._elem.querySelector(".card__title").textContent = this._text; /* Set title */
    /* Return the created card */
    return this._elem;
  }
  /* Set events listeners for every card we create! */
  _setEventListeners() {
    /* Add event listener for like button */
    this._elem.querySelector(".card__like-button").addEventListener("click", (event) =>
    {this._likeCard(event);});
    /* Add event listener for delete button */
    this._elem.querySelector(".card__delete-button").addEventListener("click", (event) => 
    {this._deleteCard(event);});
    /* Add event listener for Big-Image Modal opening on click the card image */
    this._cardImage.addEventListener("click", (event) => 
    {this._openBigImage(event);});
  }
  /* Card like button toggle */
  _likeCard(evt) {
    evt.preventDefault();
    const button = evt.target;
    button.classList.toggle("card__like-button_active");
  }
  /* Card deleting */
  _deleteCard(event){
    event.preventDefault();
    let parentItem = event.currentTarget.closest(".card");
    parentItem.remove();
    parentItem = null;
  }
  _openBigImage(event){
    evt.preventDefault();
    const target = event.target;
    const link = target.src;
    const name = target.alt;
    openModal(cardBigModal);
    //Set the image to be displayed:
    cardBigModalImage.setAttribute("src", link);
    cardBigModalImage.setAttribute("alt", name);
    cardBigModalText.textContent = name;
  }
}