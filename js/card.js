import {togglePopup, escCloseModal} from './utils.js';

class Card {
  constructor({name, link}, cardTemplateSelector) {
    this._text = name;
    this._link = link;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  _cardLikeButtonListener(evt) {
    evt.target.classList.toggle('card__like-button_selected');
  }

  _setcardTemplateSelector() {
    const cardTemplate = document.querySelector(this._cardTemplateSelector).content.querySelector('.card');
    return cardTemplate;
  }

  _cardImageClickListener() {
    const imageModalWindow = document.querySelector('.popup_type_image');
    const popupImage = imageModalWindow.querySelector('.popup__image');
    const popupImageTitle = imageModalWindow.querySelector('.popup__image-title');

    popupImage.src = this._link;
    popupImageTitle.textContent = this._text;
    popupImage.alt = this._text;
    togglePopup(imageModalWindow);
  }

  renderNewCard() {        
    const cardTemplateNewCard = this._setcardTemplateSelector();
    const cardElement = cardTemplateNewCard.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardText = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
      
    cardText.textContent = this._text;
    cardImage.src = this._link;
    cardImage.alt = this._text;
  
    cardLikeButton.addEventListener('click', this._cardLikeButtonListener.bind(this));    
    cardImage.addEventListener('click', this._cardImageClickListener.bind(this));
    
    return(cardElement);    
  }
}

export default Card;