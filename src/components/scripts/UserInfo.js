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
      avatar: this._avatar
    };
  }

  getUserData() {
    return this._data;
  }

  setUserInfo(data) {
    this._name = data.name;
    this._job = data.about;
    this._avatar = data.avatar;
    this._nameElement.textContent = this._name;
    this._titleElement.textContent = this._job;
    this._pictureElement.setAttribute("src", this._avatar);
  }

  setUserAvatar(avatar) {
    this._avatar = avatar;
    this._pictureElement.setAttribute("src", this._avatar);
  }
}
