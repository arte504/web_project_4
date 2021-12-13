export default class UserInfo {
  constructor( nameElement, titleElement, pictureElement ) {
    this._nameElement = nameElement;
    this._titleElement = titleElement;
    this._pictureElement = pictureElement;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar,
      id: this._id
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
