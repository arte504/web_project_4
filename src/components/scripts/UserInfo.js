export default class UserInfo {
  constructor( {name, job, avatar} ) {
    this._name = document.querySelector(`${name}`);
    this._job = document.querySelector(`${job}`);
    this._avatar = document.querySelector(`${avatar}`);
    this.setUserInfo = this.setUserInfo.bind(this);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.userName = this._name.textContent;
    userInfo.userJob = this._job.textContent;

    return userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }

  setUserAvatar( {avatar} ) {
    this._avatar.style.backgroundImage = `url('${avatar}')`;
  }
}
