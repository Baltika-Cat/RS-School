export default class LogoutRequest {
  id = 'logout_request';

  type = 'USER_LOGOUT';

  payload = {
    user: {
      login: '',
      password: '',
    },
  };

  constructor(login: string, password: string) {
    this.payload.user.login = login;
    this.payload.user.password = password;
  }
}
