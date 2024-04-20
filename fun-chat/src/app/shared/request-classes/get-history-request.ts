export default class GetHistoryRequest {
  id: string;

  type = 'MSG_FROM_USER';

  payload = {
    user: {
      login: '',
    },
  };

  constructor(login: string, id: 'get-history-login' | 'get-history-click') {
    this.payload.user.login = login;
    this.id = id;
  }
}
