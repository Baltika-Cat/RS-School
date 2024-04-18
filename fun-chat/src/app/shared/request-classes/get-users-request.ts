export default class GetUsersRequest {
  id = 'get-users';

  type: string;

  payload = null;

  constructor(type: 'USER_ACTIVE' | 'USER_INACTIVE') {
    this.type = type;
  }
}
