export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this.renderer = renderer;
  }

  addCard(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  renderCards() {
    this._items.forEach((card) => {
      this._renderer(card);
    });
  }
}
