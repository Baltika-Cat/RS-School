import { div, buttonTag, input, form, pTag, aTag, ul, li } from '../shared/tags';
import GetUsersRequest from '../shared/request-classes/get-users-request';
import { UserLogined } from '../shared/interfaces';
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

  messageHistory = div('message-history', this.chatWrapper);

  oldMessages = div('old-messages-wrapper', this.messageHistory);

  newMessages = div('new-messages-wrapper', this.messageHistory);

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

  constructor(socket: WebSocket, user: string) {
    this.sendButton.classList.add('disabled');
    this.messageHistory.textContent = 'Выберите пользователя для отправки сообщения';
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
      } else if (message.type === 'USER_EXTERNAL_LOGOUT') {
        this.makeUserInactive(message.payload.user.login);
      } else if (message.id === 'for-login') {
        this.getUsers(e);
      } else if (message.id === 'for-search') {
        this.searchUsers(e);
      }
    });
    this.usersSearch.addEventListener('input', () => {
      this.activeUsers.innerHTML = '';
      this.inactiveUsers.innerHTML = '';
      this.sendSearchUsersRequst();
    });
    this.messageInput.addEventListener('input', () => {
      if (this.messageInput.value) {
        this.sendButton.classList.remove('disabled');
      } else {
        this.sendButton.classList.add('disabled');
      }
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
}
