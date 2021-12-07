import {profileName, profileJob, avatarImage} from '../../pages/Index.js';

export default class UserInfo {
  constructor(name, job, avatar) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
  }

  getUserInfo() {
    return (this._userInfo = {
      title: this._name.textContent,
      job: this._job.textContent
    });
  }

  setUserInfo(title, job, userAvatar) {
    this._userInfo = { title, job, userAvatar };
    if (userAvatar) {
      avatarImage.src = this._userInfo.userAvatar;
      profileName.textContent = this._userInfo.title;
      profileJob.textContent = this._userInfo.job;
    } else {
      profileName.textContent = this._userInfo.title;
      profileJob.textContent = this._userInfo.job;
    }
  }
}
