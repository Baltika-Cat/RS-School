import { div, buttonTag, input, form, pTag, aTag, ul, li } from '../shared/tags';
import GetUsersRequest from '../shared/request-classes/get-users-request';
import GetHistoryRequest from '../shared/request-classes/get-history-request';
import SendMessageRequest from '../shared/request-classes/send-message-request';
import ReadMessageRequest from '../shared/request-classes/read-message-request';
import EditedMessageRequest from '../shared/request-classes/edition-message-request';
import DeletionMessageRequest from '../shared/request-classes/deletion-message-request';
import { UserLogined, Message } from '../shared/interfaces';
import './main-page-style.css';
import logo from '../shared/assets/rsschool.svg';

export default class MainPage {
  socket: WebSocket;

  mainPageWrapper = div('main-wrapper');

  header = div('main-header', this.mainPageWrapper);

  userName = pTag('user-name', this.header, '');

  mainTitle = pTag('main-title', this.header, 'Fun-chat');

  headerButtonsArea = div('buttons-area', this.header);

  infoButton = buttonTag('header-button', this.headerButtonsArea, 'Инфо');

  logoutButton = buttonTag('header-button', this.headerButtonsArea, 'Выйти');

  mainArea = div('main-area', this.mainPageWrapper);

  usersArea = div('users-area', this.mainArea);

  searchInputOptions = {
    className: 'users-search',
    type: 'text',
    parent: this.usersArea,
    placeholder: 'Поиск...',
  };

  usersSearch = input(this.searchInputOptions);

  activeUsers = ul('users', this.usersArea);

  inactiveUsers = ul('users', this.usersArea);

  chatWrapper = div('chat-area', this.mainArea);

  userInfo = div('user-info', this.chatWrapper);

  userInfoName = pTag('user-info-name', this.userInfo, '');

  userInfoStatus = pTag('user-info-name', this.userInfo, '');

  messageHistory = div('message-history', this.chatWrapper);

  messagesWrapper: HTMLDivElement;

  sendMessageForm = form('send-message-form', this.chatWrapper, 'message-form');

  messageInputOptions = {
    className: 'message',
    type: 'text',
    parent: this.sendMessageForm,
    placeholder: 'Сообщение...',
  };

  messageInput = input(this.messageInputOptions);

  sendButton = buttonTag('send-button', this.sendMessageForm, 'Отправить');

  footer = div('main-footer', this.mainPageWrapper);

  schoolLogo = new Image();

  schoolLink = aTag('school-link', this.footer, 'https://rs.school/courses/javascript-preschool', '');

  githubLink = aTag('github-link', this.footer, 'https://github.com/Baltika-Cat', 'Baltika-Cat');

  year = pTag('year', this.footer, '2024');

  contextMenu = div('context-menu', this.messageHistory);

  contextChange = div('context-change', this.contextMenu);

  contextDelete = div('context-delete', this.contextMenu);

  userLogin: string;

  activeUsersRequest = new GetUsersRequest('for-search', 'USER_ACTIVE');

  inactiveUsersRequest = new GetUsersRequest('for-search', 'USER_INACTIVE');

  userInChatName = '';

  userInChatStatus = '';

  hasNewMessagesLine = false;

  changingMessage = false;

  messageForChanging = document.createElement('div');

  constructor(socket: WebSocket, user: string) {
    this.contextMenu.classList.add('invisible');
    this.contextChange.textContent = 'Изменить';
    this.contextDelete.textContent = 'Удалить';
    this.lockSendButton();
    this.messageInput.classList.add('disabled');
    this.messageHistory.textContent = 'Выберите пользователя для отправки сообщения';
    this.messagesWrapper = div('old-messages-wrapper', this.messageHistory);
    this.userLogin = user;
    this.userName.textContent = `User: ${user}`;
    this.schoolLogo.src = logo;
    this.schoolLink.append(this.schoolLogo);
    this.socket = socket;
    this.socket.addEventListener('message', (e) => {
      const message = JSON.parse(e.data);
      if (this.userLogin === '') {
        return;
      }
      if (message.type === 'USER_LOGOUT') {
        this.userLogin = '';
      }
      if (message.type === 'USER_EXTERNAL_LOGIN') {
        this.addNewActiveUser(message.payload.user.login);
        if (message.payload.user.login === this.userInChatName) {
          this.startChat(e);
        }
      } else if (message.type === 'USER_EXTERNAL_LOGOUT') {
        this.makeUserInactive(message.payload.user.login);
      } else if (message.id === 'for-login') {
        this.getUsers(e);
      } else if (message.id === 'for-search') {
        this.searchUsers(e);
      } else if (message.type === 'MSG_FROM_USER') {
        this.getHistory(message.id, message.payload.messages);
      } else if (message.type === 'MSG_SEND') {
        if (message.id) {
          this.sendMessage(message.payload.message);
        } else {
          this.receiveMessage(message.payload.message);
        }
      } else if (message.type === 'MSG_READ') {
        if (!message.id) {
          MainPage.changeStatusToRead(message.payload.message.id);
        }
      } else if (message.type === 'MSG_EDIT') {
        if (!message.id) {
          MainPage.changeRecipientMessage(message.payload.message.id, message.payload.message.text);
        }
      } else if (message.type === 'MSG_DELETE') {
        if (!message.id) {
          MainPage.deleteRecipientMessage(message.payload.message.id);
        }
      }
    });
    this.usersSearch.addEventListener('input', () => {
      this.activeUsers.innerHTML = '';
      this.inactiveUsers.innerHTML = '';
      this.sendSearchUsersRequest();
    });
    this.messageInput.addEventListener('input', () => {
      if (this.messageInput.value) {
        this.unlockSendButton();
      } else {
        this.lockSendButton();
      }
    });
    this.usersArea.addEventListener('click', (e) => {
      this.startChat(e);
      this.lockSendButton();
    });
    this.sendMessageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!this.changingMessage) {
        this.sendMessageRequest(this.userInChatName, this.messageInput.value);
        this.messageInput.value = '';
        this.lockSendButton();
        this.getNewMessages();
        this.readNewMessages();
      } else {
        this.changeMessage();
      }
    });
    this.messageHistory.addEventListener('mouseup', () => {
      this.getNewMessages();
      this.readNewMessages();
    });
    this.messageHistory.addEventListener('wheel', () => {
      this.getNewMessages();
      this.readNewMessages();
    });
    this.messageHistory.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.contextMenu.classList.add('invisible');
      this.openContextMenu(e);
    });
    window.addEventListener('mouseup', () => {
      this.contextMenu.classList.add('invisible');
    });
    this.contextChange.addEventListener('click', () => {
      this.contextMenu.classList.add('invisible');
      this.changeSenderMessage();
    });
    this.contextDelete.addEventListener('click', () => {
      this.contextMenu.classList.add('invisible');
      this.deleteSenderMessage();
    });
  }

  sendSearchUsersRequest() {
    this.socket.send(JSON.stringify(this.activeUsersRequest));
    this.socket.send(JSON.stringify(this.inactiveUsersRequest));
  }

  searchUsers(event: MessageEvent) {
    const message = JSON.parse(event.data);
    if (message.type === 'USER_ACTIVE') {
      const users = message.payload.users.filter((user: UserLogined) => user.login.includes(this.usersSearch.value));
      users.forEach((user: UserLogined) => {
        if (user.login !== this.userLogin) {
          li('active-user', this.activeUsers, user.login);
        }
      });
    }
    if (message.type === 'USER_INACTIVE') {
      const users = message.payload.users.filter((user: UserLogined) => user.login.includes(this.usersSearch.value));
      users.forEach((user: UserLogined) => {
        li('inactive-user', this.inactiveUsers, user.login);
      });
    }
  }

  addNewActiveUser(login: string) {
    if (login.includes(this.usersSearch.value)) {
      const users = [...document.querySelectorAll('.inactive-user p')];
      const inactiveUser = users.find((user) => user.textContent === login);
      if (inactiveUser?.parentElement) {
        inactiveUser.parentElement.classList.remove('inactive-user');
        inactiveUser.parentElement.classList.add('active-user');
        this.activeUsers.append(inactiveUser.parentElement);
        if (this.userInChatName === inactiveUser.textContent) {
          this.userInChatStatus = 'В сети';
          this.userInfoStatus.textContent = this.userInChatStatus;
        }
      } else {
        li('active-user', this.activeUsers, login);
      }
    }
  }

  makeUserInactive(login: string) {
    const users = [...document.querySelectorAll('.active-user p')];
    const activeUser = users.filter((user) => user.textContent === login)[0];
    if (activeUser?.parentElement) {
      activeUser.parentElement.classList.remove('active-user');
      activeUser.parentElement.classList.add('inactive-user');
      this.inactiveUsers.append(activeUser.parentElement);
      if (this.userInChatName === activeUser.textContent) {
        this.userInChatStatus = 'Не в сети';
        this.userInfoStatus.textContent = this.userInChatStatus;
      }
    }
  }

  sendGetUsersRequest(requestType: 'USER_ACTIVE' | 'USER_INACTIVE') {
    const request = new GetUsersRequest('for-login', requestType);
    this.socket.send(JSON.stringify(request));
  }

  getUsers(event: MessageEvent) {
    const message = JSON.parse(event.data);
    const userClass = message.type === 'USER_ACTIVE' ? 'active-user' : 'inactive-user';
    const userArea = message.type === 'USER_ACTIVE' ? this.activeUsers : this.inactiveUsers;
    const { users } = message.payload;
    users.forEach((user: UserLogined) => {
      if (user.login !== this.userLogin) {
        li(userClass, userArea, user.login);
        this.sendGetHistoryRequest(user.login, 'get-history-login');
      }
    });
  }

  sendGetHistoryRequest(userName: string, id: 'get-history-login' | 'get-history-click') {
    const request = new GetHistoryRequest(userName, id);
    this.socket.send(JSON.stringify(request));
  }

  startChat(event: Event) {
    const { target } = event;
    if (target instanceof HTMLElement && target.tagName.toLowerCase() === 'p') {
      this.messageInput.classList.remove('disabled');
      this.userInChatName = target.textContent ? target.textContent : '';
      const parent = target.parentElement;
      if (parent) {
        this.userInChatStatus = parent.classList.contains('active-user') ? 'В сети' : 'Не в сети';
        this.userInfoName.textContent = this.userInChatName;
        this.userInfoStatus.textContent = this.userInChatStatus;
      }
      this.messageHistory.textContent = 'Начните диалог с этим пользователем';
      this.sendGetHistoryRequest(this.userInChatName, 'get-history-click');
    }
  }

  addMessagesToNewChat() {
    if (this.messageHistory.textContent) {
      this.messageHistory.textContent = '';
      this.messageHistory.append(this.messagesWrapper);
    }
  }

  getHistory(id: 'get-history-login' | 'get-history-click', messages: Message[]): void {
    if (id === 'get-history-login') {
      if (messages.length) {
        const messagesFromInterlocuter = messages.filter((message) => message.from !== this.userLogin);
        const unreadMessages = messagesFromInterlocuter.filter((message) => !message.status.isReaded);
        if (unreadMessages.length) {
          const userName = messages[0].from !== this.userLogin ? messages[0].from : messages[0].to;
          const userMessages = [...document.querySelectorAll('.active-user-name')].filter(
            (user) => user.textContent === userName,
          )[0];
          const messagesCount = userMessages?.nextSibling;
          if (messagesCount instanceof HTMLElement) {
            messagesCount.classList.add('messages-count');
            messagesCount.textContent = String(unreadMessages.length);
          }
        }
      }
    } else {
      this.showHistory(messages);
    }
  }

  showHistory(messages: Message[]) {
    if (messages.length) {
      this.messagesWrapper.innerHTML = '';
      messages.forEach((message) => {
        if (message.from === this.userLogin) {
          MainPage.createMessage('sent-message', this.messagesWrapper, message);
        } else {
          if (!message.status.isReaded && !this.hasNewMessagesLine) {
            this.createDividingLine();
          }
          MainPage.createMessage('received-message', this.messagesWrapper, message);
        }
      });
      this.addMessagesToNewChat();
      this.hasNewMessagesLine = false;
      const line = document.querySelector('#line');
      if (line) {
        window.location.href = '#line';
      } else {
        this.messageHistory.scrollTop = this.messageHistory.scrollHeight;
      }
    }
  }

  sendMessageRequest(recipient: string, message: string) {
    const request = new SendMessageRequest(recipient, message);
    this.socket.send(JSON.stringify(request));
  }

  sendMessage(messageData: Message) {
    MainPage.createMessage('sent-message', this.messagesWrapper, messageData);
    this.addMessagesToNewChat();
    this.messageHistory.scrollTop = this.messageHistory.scrollHeight;
  }

  receiveMessage(messageData: Message) {
    const user = [...document.querySelectorAll('.active-user-name')].filter(
      (currentUser) => currentUser.textContent === messageData.from,
    )[0];
    if (user instanceof HTMLElement) {
      const sibling = user.nextSibling;
      if (sibling instanceof HTMLDivElement) {
        if (sibling.classList.contains('messages-count')) {
          sibling.textContent = sibling.textContent ? String(Number(sibling.textContent) + 1) : '';
        } else {
          sibling.classList.add('messages-count');
          sibling.textContent = '1';
        }
      }
    }
    if (messageData.from === this.userInChatName) {
      const line = document.querySelector('#line');
      if (!line) {
        this.createDividingLine();
        MainPage.createMessage('received-message', this.messagesWrapper, messageData);
        this.addMessagesToNewChat();
        this.messageHistory.scrollTop = this.messageHistory.scrollHeight;
      } else {
        MainPage.createMessage('received-message', this.messagesWrapper, messageData);
        this.addMessagesToNewChat();
        window.location.href = '#line';
      }
    }
  }

  createDividingLine() {
    const line = document.createElement('div');
    line.id = 'line';
    line.textContent = 'Новые сообщения';
    this.messagesWrapper.append(line);
    this.hasNewMessagesLine = true;
  }

  lockSendButton() {
    this.sendButton.classList.add('disabled');
    this.sendButton.disabled = true;
  }

  unlockSendButton() {
    this.sendButton.classList.remove('disabled');
    this.sendButton.disabled = false;
  }

  static dateFormatter(dateTime: number): string {
    const messageDate = new Date(dateTime);
    const date = messageDate.getDate();
    const month = String(messageDate.getMonth() + 1).padStart(2, '0');
    const year = messageDate.getFullYear();
    const hours = String(messageDate.getHours()).padStart(2, '0');
    const minutes = String(messageDate.getMinutes()).padStart(2, '0');

    return `${date}.${month}.${year}, ${hours}:${minutes}`;
  }

  static createMessage(className: 'received-message' | 'sent-message', parent: HTMLDivElement, message: Message) {
    const messageWrapper = div(className);
    if (message.id) {
      messageWrapper.setAttribute('data-id', message.id);
    }
    const nameAndDateWrapper = div('name-date', messageWrapper);
    const senderName = className === 'received-message' ? message.from : 'Вы';
    const date = MainPage.dateFormatter(message.datetime);
    pTag('sender', nameAndDateWrapper, senderName);
    pTag('date', nameAndDateWrapper, date);
    pTag('message-text', messageWrapper, message.text);
    const editedStatus = message.status.isEdited ? 'Изменено' : '';
    const messageStatusWrapper = div('message-status', messageWrapper);
    if (className === 'sent-message') {
      pTag('message-edited', messageStatusWrapper, editedStatus);
      let messageDelivered;
      if (message.status.isReaded) {
        messageDelivered = 'Прочитано';
      } else if (message.status.isDelivered) {
        messageDelivered = 'Доставлено';
      } else {
        messageDelivered = 'Отправлено';
      }
      pTag('message-delivered', messageStatusWrapper, messageDelivered);
    } else {
      pTag('message-edited', messageStatusWrapper, editedStatus);
      pTag('message-delivered', messageStatusWrapper, '');
    }

    parent.append(messageWrapper);
  }

  sendReadingMessageRequest(id: string) {
    const request = new ReadMessageRequest(id);
    this.socket.send(JSON.stringify(request));
  }

  readNewMessages() {
    const line = document.querySelector('#line');
    if (line) {
      line.remove();
      this.hasNewMessagesLine = false;
      const selectedUser = [...document.querySelectorAll('.active-user-name')].filter(
        (user) => user.textContent === this.userInChatName,
      )[0];
      const messagesCount = selectedUser?.nextSibling;
      if (messagesCount instanceof HTMLDivElement) {
        messagesCount.classList.remove('messages-count');
        messagesCount.textContent = '';
      }
    }
  }

  static changeStatusToRead(id: string) {
    const messages = [...document.querySelectorAll('.sent-message')];
    const targetMessage = messages.filter((message) => message.getAttribute('data-id') === id)[0];
    if (targetMessage) {
      const messageStatus = targetMessage.querySelector('.message-delivered');
      if (messageStatus) {
        messageStatus.textContent = 'Прочитано';
      }
    }
  }

  getNewMessages() {
    const line = document.querySelector('#line');
    if (line) {
      const newMessages = [...document.querySelectorAll('#line ~ .received-message')];
      const newMessagesId = newMessages.map((message) => message.getAttribute('data-id'));
      newMessagesId.forEach((messageId) => {
        if (messageId) {
          this.sendReadingMessageRequest(messageId);
        }
      });
    }
  }

  openContextMenu(event: Event) {
    const { target } = event;
    let message;
    if (target instanceof HTMLElement) {
      if (target.classList.contains('sent-message')) {
        message = target;
      } else if (target.closest('.sent-message')) {
        message = target.closest('.sent-message');
      }
    }
    if (message instanceof HTMLDivElement) {
      this.messageForChanging = message;
      this.messageForChanging.append(this.contextMenu);
      this.contextMenu.classList.remove('invisible');
    }
  }

  changeSenderMessage() {
    this.changingMessage = true;
    const messageText = this.messageForChanging.querySelector('.message-text');
    if (messageText) {
      this.messageInput.value = messageText.textContent ?? '';
      this.messageInput.focus();
    }
  }

  changeMessage() {
    if (this.changingMessage) {
      const messageText = this.messageForChanging.querySelector('.message-text');
      if (messageText) {
        if (messageText.textContent !== this.messageInput.value) {
          messageText.textContent = this.messageInput.value;
          const messageEdited = this.messageForChanging.querySelector('.message-edited');
          if (messageEdited) {
            messageEdited.textContent = 'Изменено';
          }
          const messageId = this.messageForChanging.getAttribute('data-id');
          if (messageId) {
            const request = new EditedMessageRequest(messageId, this.messageInput.value);
            this.socket.send(JSON.stringify(request));
          }
        }
      }
    }
    this.messageInput.value = '';
    this.sendButton.classList.add('disabled');
    this.changingMessage = false;
    this.messageInput.blur();
  }

  static changeRecipientMessage(id: string, text: string) {
    const messages = [...document.querySelectorAll('.received-message')];
    const targetMessage = messages.filter((message) => message.getAttribute('data-id') === id)[0];
    if (targetMessage) {
      const messageStatus = targetMessage.querySelector('.message-edited');
      if (messageStatus) {
        messageStatus.textContent = 'Изменено';
      }
      const targetMessageText = targetMessage.querySelector('.message-text');
      if (targetMessageText) {
        targetMessageText.textContent = text;
      }
    }
  }

  deleteSenderMessage() {
    const id = this.messageForChanging.getAttribute('data-id');
    if (id) {
      const request = new DeletionMessageRequest(id);
      this.socket.send(JSON.stringify(request));
    }
    this.messageForChanging.remove();
  }

  static deleteRecipientMessage(id: string) {
    const messages = [...document.querySelectorAll('.received-message')];
    const targetMessage = messages.filter((message) => message.getAttribute('data-id') === id)[0];
    if (targetMessage) {
      targetMessage.remove();
    }
  }
}
