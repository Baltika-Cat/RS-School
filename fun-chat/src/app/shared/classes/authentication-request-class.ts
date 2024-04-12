export default class AuthenticationRequest {
  id = 'meow';

  type = 'USER_LOGIN';

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
