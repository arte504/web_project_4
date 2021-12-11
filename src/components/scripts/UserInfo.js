export default class UserInfo {
  constructor( nameElement, titleElement, pictureElement ) {
    this._nameElement = nameElement;
    this._titleElement = titleElement;
    this._pictureElement = pictureElement;
  }

  getUserInfo() {
    return {
      name: this._name,
      job: this._job,
      id: this._id,
      avatar: this._avatar,
    };
  }

  getUserData() {
    return this._data;
  }

  setUserInfo({name, job, _id, avatar}) {
    this._name = name;
    this._job = job;
    this._id = _id;
    this._avatar = avatar;
    this._nameElement.textContent = this._name;
    this._titleElement.textContent = this._job;
    this._pictureElement.setAttribute("src", this._avatar);
  }
}
