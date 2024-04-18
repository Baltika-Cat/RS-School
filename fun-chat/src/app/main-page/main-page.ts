import { div, buttonTag, input, form, pTag, aTag, ul, li } from '../shared/tags';
import GetUsersRequest from '../shared/request-classes/get-users-request';
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

  constructor(socket: WebSocket, user: string) {
    this.userLogin = user;
    this.userName.textContent = `User: ${user}`;
    this.schoolLogo.src = logo;
    this.schoolLink.append(this.schoolLogo);
    this.socket = socket;
    this.socket.addEventListener('message', (e) => {
      this.addNewActiveUser(e);
    });
  }

  addNewActiveUser(event: MessageEvent) {
    const message = JSON.parse(event.data);
    if (message.type === 'USER_EXTERNAL_LOGIN') {
      const userName = message.payload.user.login;
      const users = [...document.querySelectorAll('.inactive-user')];
      const inactiveUser = users.find((user) => user.textContent === userName);
      console.log(inactiveUser);
      if (inactiveUser) {
        inactiveUser.classList.remove('inactive-user');
        inactiveUser.classList.add('active-user');
        this.activeUsers.append(inactiveUser);
      } else {
        li('active-user', this.activeUsers, userName);
      }
    }
  }

  getUsers(requestType: 'USER_ACTIVE' | 'USER_INACTIVE') {
    const request = new GetUsersRequest(requestType);
    this.socket.send(JSON.stringify(request));
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.type === requestType) {
        const userClass = requestType === 'USER_ACTIVE' ? 'active-user' : 'inactive-user';
        const userArea = requestType === 'USER_ACTIVE' ? this.activeUsers : this.inactiveUsers;
        // console.log(message)
        const { users } = message.payload;
        for (let i = 0; i < users.length; i += 1) {
          if (users[i].login !== this.userLogin) {
            li(userClass, userArea, users[i].login);
          }
        }
      }
    });
  }
  /* toMainPage() {
    return this.mainPageWrapper;
  } */

  /* logout(options: LogoutOptions): boolean {
    let canLogout = false;
    this.logoutButton.addEventListener('click', () => {
      const request = new LogoutRequest(options.login, options.password);
      options.socket.send(JSON.stringify(request));
      options.socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        if (message.type !== 'ERROR') {
          canLogout = true;
          // console.log(message);
        }
      });
    });
    return canLogout;
  } */
}
