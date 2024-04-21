export default class ReadMessageRequest {
  id = 'read-message';

  type = 'MSG_READ';

  payload = {
    message: {
      id: '',
    },
  };

  constructor(id: string) {
    this.payload.message.id = id;
  }
}
