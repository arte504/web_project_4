export default class UserInfo {
  constructor(name, job, avatar) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
  }

  getUserInfo() {
    return (this._userInfo = {
      name: this._name.textContent,
      job: this._job.textContent
    });
  }

  setUserInfo(userInfo) {
    const { name, job, userAvatar } = userInfo;
    this._name.textContent = name;
    this._job.textContent = job;
    this._avatar.src = userAvatar;
  }
}
