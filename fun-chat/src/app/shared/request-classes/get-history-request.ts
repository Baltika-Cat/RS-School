import { historyEvent } from '../interfaces';

export default class GetHistoryRequest {
  id: string;

  type = 'MSG_FROM_USER';

  payload = {
    user: {
      login: '',
    },
  };

  constructor(login: string, id: historyEvent) {
    this.payload.user.login = login;
    this.id = id;
  }
}
