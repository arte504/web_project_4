export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedElements = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    this._renderedElements.forEach((item) => this._renderer(item));
  }
  
  addItem(item) {
    this._container.append(item);
  }

  prependItem(item) {
    this._container.prepend(item);
  }
}
