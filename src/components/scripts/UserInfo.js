export default class UserInfo {
  constructor({name, job, avatar}) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
    this.setUserInfo = this.setUserInfo.bind(this);
  }

  getUserInfo() {
    const user = {};
    user.name = this._name.textContent;
    user.job = this._job.textContent;

    return user;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }

  setUserAvatar(avatar) {
    this._avatar.style.backgroundImage = `url('${avatar}')`;
  }
}
