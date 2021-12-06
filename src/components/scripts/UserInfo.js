export default class UserInfo {
  constructor( {name, job, avatar} ) {
    this._name = document.querySelector(`${name}`);
    this._job = document.querySelector(`${job}`);
    this._avatar = document.querySelector(`${avatar}`);
  }

  getUserInfo() {
    return {
    name : this._name.textContent,
    job : this._job.textContent,
    avatar: this._avatar.src
    };
  }

  setUserInfo(userInfo) {
    const { name, job } = userInfo;
    this._name.textContent = name;
    this._job.textContent = job;
  }

  setUserAvatar( {avatar} ) {
    this._avatar.src = avatar;
  }
}
