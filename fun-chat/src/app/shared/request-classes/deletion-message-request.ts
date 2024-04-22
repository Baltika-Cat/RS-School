export default class DeletionMessageRequest {
  id = 'delete-message';

  type = 'MSG_DELETE';

  payload = {
    message: {
      id: '',
    },
  };

  constructor(id: string) {
    this.payload.message.id = id;
  }
}
