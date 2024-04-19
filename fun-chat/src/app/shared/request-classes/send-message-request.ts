export default class SendMessageRequest {
  id = 'send-message';

  type = 'MSG_SEND';

  payload = {
    message: {
      to: '',
      text: '',
    },
  };

  constructor(recipient: string, message: string) {
    this.payload.message.to = recipient;
    this.payload.message.text = message;
  }
}
