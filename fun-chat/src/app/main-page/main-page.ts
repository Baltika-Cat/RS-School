import { div, buttonTag, input, form, pTag, aTag } from '../shared/tags';
// import LogoutRequest from '../shared/request-classes/logout-request';
// import { LogoutOptions } from '../shared/interfaces';
import './main-page-style.css';
import logo from '../shared/assets/rsschool.svg';

export default class MainPage {
  mainPageWrapper = div('main-wrapper');

  header = div('main-header', this.mainPageWrapper);

  userName = pTag('user-name', this.header, '');

  mainTitle = pTag('main-title', this.header, 'Fun-chat');

  headerButtonsArea = div('buttons-area', this.header);

  infoButton = buttonTag('button', this.headerButtonsArea, 'Инфо');

  logoutButton = buttonTag('button', this.headerButtonsArea, 'Выйти');

  mainArea = div('main-area', this.mainPageWrapper);

  usersArea = div('users-area', this.mainArea);

  searchInputOptions = {
    className: 'users-search',
    type: 'text',
    parent: this.usersArea,
    placeholder: 'Поиск...',
  };

  usersSearch = input(this.searchInputOptions);

  users = div('users', this.usersArea);

  chatWrapper = div('chat-area', this.mainArea);

  messageHistory = div('message-history', this.chatWrapper);

  // sendMessageArea = div('send-message-area', this.chatWrapper);

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

  schoolLink = aTag('school-link', this.footer, 'https://rs.school/courses/javascript-mentoring-program', '');

  githubLink = aTag('github-link', this.footer, 'https://github.com/Baltika-Cat', 'Baltika-Cat');

  year = pTag('year', this.footer, '2024');

  constructor(user: string) {
    this.userName.textContent = `User: ${user}`;
    this.schoolLogo.src = logo;
    this.schoolLink.append(this.schoolLogo);
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
