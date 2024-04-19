export default class GetUsersRequest {
  id: string;

  type: string;

  payload = null;

  constructor(id: 'for-login' | 'for-search', type: 'USER_ACTIVE' | 'USER_INACTIVE') {
    this.type = type;
    this.id = id;
  }
}
