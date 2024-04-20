import { div, buttonTag, input, form, pTag, aTag, ul, li } from '../shared/tags';
import GetUsersRequest from '../shared/request-classes/get-users-request';
import GetHistoryRequest from '../shared/request-classes/get-history-request';
import SendMessageRequest from '../shared/request-classes/send-message-request';
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

  oldMessages: HTMLDivElement;

  newMessages: HTMLDivElement;

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

  userLogin: string;

  activeUsersRequest = new GetUsersRequest('for-search', 'USER_ACTIVE');

  inactiveUsersRequest = new GetUsersRequest('for-search', 'USER_INACTIVE');

  userInChatName = '';

  userInChatStatus = '';

  constructor(socket: WebSocket, user: string) {
    this.lockSendButton();
    this.messageInput.classList.add('disabled');
    this.messageHistory.textContent = 'Выберите пользователя для отправки сообщения';
    this.oldMessages = div('old-messages-wrapper', this.messageHistory);
    this.newMessages = div('new-messages-wrapper', this.messageHistory);
    this.userLogin = user;
    this.userName.textContent = `User: ${user}`;
    this.schoolLogo.src = logo;
    this.schoolLink.append(this.schoolLogo);
    this.socket = socket;
    this.socket.addEventListener('message', (e) => {
      const message = JSON.parse(e.data);
      // console.log(message)
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
        this.showHistory(message.payload.messages);
      } else if (message.type === 'MSG_SEND') {
        if (message.id) {
          this.sendMessage(message.payload.message);
        } else {
          this.receiveMessage(message.payload.message);
        }
      } else if (message.type === 'MSG_DELIVER') {
        // console.log(message)
      }
    });
    this.usersSearch.addEventListener('input', () => {
      this.activeUsers.innerHTML = '';
      this.inactiveUsers.innerHTML = '';
      this.sendSearchUsersRequst();
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
      this.sendMessageRequest(this.userInChatName, this.messageInput.value);
      this.messageInput.value = '';
      this.lockSendButton();
    });
  }

  sendSearchUsersRequst() {
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
      const users = [...document.querySelectorAll('.inactive-user')];
      const inactiveUser = users.find((user) => user.textContent === login);
      if (inactiveUser) {
        inactiveUser.classList.remove('inactive-user');
        inactiveUser.classList.add('active-user');
        this.activeUsers.append(inactiveUser);
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
    const users = [...document.querySelectorAll('.active-user')];
    const activeUser = users.filter((user) => user.textContent === login)[0];
    activeUser.classList.remove('active-user');
    activeUser.classList.add('inactive-user');
    this.inactiveUsers.append(activeUser);
    if (this.userInChatName === activeUser.textContent) {
      this.userInChatStatus = 'Не в сети';
      this.userInfoStatus.textContent = this.userInChatStatus;
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
      }
    });
  }

  sendGetHistoryRequest(userName: string) {
    const request = new GetHistoryRequest(userName);
    this.socket.send(JSON.stringify(request));
  }

  startChat(event: Event) {
    const { target } = event;
    // console.log(target)
    this.messageInput.classList.remove('disabled');
    if (target instanceof HTMLElement && target.tagName.toLowerCase() === 'p') {
      this.userInChatName = target.textContent ? target.textContent : '';
      const parent = target.parentElement;
      if (parent) {
        this.userInChatStatus = parent.classList.contains('active-user') ? 'В сети' : 'Не в сети';
        this.userInfoName.textContent = this.userInChatName;
        this.userInfoStatus.textContent = this.userInChatStatus;
      }
    }
    this.messageHistory.textContent = 'Начните диалог с этим пользователем';
    this.sendGetHistoryRequest(this.userInChatName);
  }

  showHistory(messages: Message[]) {
    if (messages.length) {
      this.messageHistory.innerHTML = '';
      this.oldMessages.innerHTML = '';
      messages.forEach((message) => {
        // console.log(message)
        // let messageWrapper;
        if (message.from === this.userLogin) {
          this.createMessage('sent-message', this.oldMessages, message);
        } else {
          this.createMessage('received-message', this.oldMessages, message);
        }
        // pTag('message-text', messageWrapper, message.text);
      });
      this.messageHistory.append(this.oldMessages);
      this.messageHistory.scrollTop = this.messageHistory.scrollHeight;
    }
  }

  sendMessageRequest(recipient: string, message: string) {
    const request = new SendMessageRequest(recipient, message);
    this.socket.send(JSON.stringify(request));
  }

  sendMessage(messageData: Message) {
    // const messageWrapper = div('sent-message', this.oldMessages);
    // pTag('message-text', messageWrapper, messageData.text);
    this.createMessage('sent-message', this.oldMessages, messageData);
    this.messageHistory.scrollTop = this.messageHistory.scrollHeight;
  }

  receiveMessage(messageData: Message) {
    // console.log(messageData)
    // const messageWrapper = div('received-message');
    // pTag('message-text', messageWrapper, messageData.text);
    if (messageData.from === this.userInChatName) {
      // this.createMessage('received-message', this.oldMessages, messageData);
      // this.oldMessages.append(messageWrapper);
      this.createMessage('received-message', this.oldMessages, messageData);
      this.messageHistory.scrollTop = this.messageHistory.scrollHeight;
    } else {
      this.createMessage('received-message', this.newMessages, messageData);
    }
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
    const month = messageDate.getMonth() + 1;
    const year = messageDate.getFullYear();
    const hours = String(messageDate.getHours()).padStart(2, '0');
    const minutes = String(messageDate.getMinutes()).padStart(2, '0');

    return `${date}.${month}.${year}, ${hours}:${minutes}`;
  }

  createMessage(className: 'received-message' | 'sent-message', parent: HTMLDivElement, message: Message) {
    const messageWrapper = div(className);
    const nameAndDateWrapper = div('name-date', messageWrapper);
    const senderName = className === 'received-message' ? message.from : 'Вы';
    const date = MainPage.dateFormatter(message.datetime);
    pTag('sender', nameAndDateWrapper, senderName);
    pTag('date', nameAndDateWrapper, date);
    pTag('message-text', messageWrapper, message.text);
    const messageStatusWrapper = div('message-status', messageWrapper);
    if (className === 'sent-message') {
      pTag('message-edited', messageStatusWrapper, ' ');
      const messageDelivered = this.userInChatStatus === 'В сети' ? 'Доставлено' : 'Отправлено';
      pTag('message-delivered', messageStatusWrapper, messageDelivered);
    } else {
      pTag('message-edited', messageStatusWrapper, ' ');
      pTag('message-delivered', messageStatusWrapper, ' ');
    }

    parent.append(messageWrapper);
  }
}
