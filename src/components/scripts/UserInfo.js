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

  setUserInfo(name, job) {
    this._name = name;
    this._job = job;
    this._nameElement.textContent = this._name;
    this._titleElement.textContent = this._job;
  }

  setUserAvatar(avatar) {
    this._avatar = avatar;
    this._pictureElement.setAttribute("src", this._avatar);
  }
}
