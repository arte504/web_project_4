import Modal from './Modal.js';
  
export default class ModalDeleteConfirmation extends Modal {
  constructor (selector, handleSubmit) {
    super(selector);
    this._form = document.querySelector(this._selector);
    this._handleSubmit = handleSubmit;
    this._handleSubmitHandler = this._handleSubmitHandler.bind(this);
  }
  
  _handleSubmitHandler (event) {
    event.preventDefault();
    this._handleSubmit();
    super.close();
  }
  
  _setEventListeners () {
    super._setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitHandler);
  }
  
  _removeEventListeners () {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._handleSubmitHandler);
  }
}