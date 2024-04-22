export default class EditedMessage {
  id = 'edit-message';

  type = 'MSG_EDIT';

  payload = {
    message: {
      id: '',
      text: '',
    },
  };

  constructor(id: string, text: string) {
    this.payload.message.id = id;
    this.payload.message.text = text;
  }
}
