export default class GetHistoryRequest {
  id = 'get-history';

  type = 'MSG_FROM_USER';

  payload = {
    user: {
      login: '',
    },
  };

  constructor(login: string) {
    this.payload.user.login = login;
  }
}
