import { mainTag } from './shared/tags';
import AuthenticationRequest from './shared/request-classes/authentication-request';
import LogoutRequest from './shared/request-classes/logout-request';
import loginWindow from './login-page/login-page';
import informationWindow from './information-page/information-page';
import PopUpWindow from './shared/pop-up-windows/pop-up-windows';
import MainPage from './main-page/main-page';

const url = 'ws://127.0.0.1:4000';

const {
  formWrapper,
  loginForm,
  loginInput,
  passwordInput,
  loginButton,
  infoButton,
  failedLoginValidation,
  failedPasswordValidation,
} = loginWindow;

class App {
  main = mainTag('main');

  isLogined = false;

  static socket: WebSocket;

  static reconnectingInterval: number;

  static checkInterval: number;

  static errorWindow: PopUpWindow | undefined;

  login = '';

  password = '';

  prevPage: HTMLDivElement;

  loginValidation = false;

  passwordValidation = false;

  info = infoButton;

  constructor() {
    this.prevPage = formWrapper;
  }

  start() {
    App.socket = new WebSocket(url);
    loginButton.classList.add('disabled');
    this.submitForm();
    this.toInformation();
    this.validateLogin();
    this.validatePassword();
    App.socket.addEventListener('message', (e) => {
      const message = JSON.parse(e.data);
      if (message.type === 'USER_LOGIN') {
        this.toMainPage();
      } else if (message.type === 'USER_LOGOUT') {
        this.toLoginPage();
      } else if (message.type === 'ERROR') {
        const errorMessage = message.payload.error;
        App.errorWindow = new PopUpWindow(errorMessage);
      }
    });

    App.checkInterval = setInterval(() => {
      this.reconnect();
    }, 2000);
  }

  authorize() {
    const request = new AuthenticationRequest(this.login, this.password);
    App.socket.send(JSON.stringify(request));
  }

  submitForm() {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.login = loginInput.value;
      this.password = passwordInput.value;
      this.authorize();
    });
  }

  toMainPage() {
    this.clearPage();
    this.isLogined = true;
    const mainPage = new MainPage(App.socket, this.login);
    this.main.append(mainPage.mainPageWrapper);
    mainPage.sendGetUsersRequest('USER_ACTIVE');
    mainPage.sendGetUsersRequest('USER_INACTIVE');
    this.prevPage = mainPage.mainPageWrapper;
    this.info = mainPage.infoButton;
    this.toInformation();
    mainPage.logoutButton.addEventListener('click', () => {
      this.sendLogoutRequest();
    });
  }

  disableButtonDueLogin() {
    this.loginValidation = false;
    loginButton.classList.add('disabled');
  }

  disableButtonDuePassword() {
    this.passwordValidation = false;
    loginButton.classList.add('disabled');
  }

  validateLogin() {
    loginInput.addEventListener('input', () => {
      if (!loginInput.value) {
        failedLoginValidation.textContent = 'Поле обязательно для заполнения';
        this.disableButtonDueLogin();
      } else if (loginInput.value.length < loginInput.minLength) {
        failedLoginValidation.textContent = `Минимум ${loginInput.minLength} символа`;
        this.disableButtonDueLogin();
      } else if (loginInput.value === loginInput.value.toLowerCase()) {
        failedLoginValidation.textContent = 'Должна быть хотя бы одна заглавная буква';
        this.disableButtonDueLogin();
      } else {
        failedLoginValidation.textContent = '';
        this.loginValidation = true;
        if (this.passwordValidation) {
          loginButton.classList.remove('disabled');
        }
      }
    });
  }

  validatePassword() {
    passwordInput.addEventListener('input', () => {
      if (!passwordInput.value) {
        failedPasswordValidation.textContent = 'Поле обязательно для заполнения';
        this.disableButtonDuePassword();
      } else if (passwordInput.value.length < passwordInput.minLength) {
        failedPasswordValidation.textContent = `Минимум ${passwordInput.minLength} символа`;
        this.disableButtonDuePassword();
      } else if (passwordInput.value === passwordInput.value.toLowerCase()) {
        failedPasswordValidation.textContent = 'Должна быть хотя бы одна заглавная буква';
        this.disableButtonDuePassword();
      } else {
        failedPasswordValidation.textContent = '';
        this.passwordValidation = true;
        if (this.loginValidation) {
          loginButton.classList.remove('disabled');
        }
      }
    });
  }

  reconnect() {
    App.socket.addEventListener('close', () => {
      if (!App.errorWindow) {
        App.errorWindow = new PopUpWindow();
      }
      if (!App.reconnectingInterval) {
        App.reconnectingInterval = setInterval(() => {
          App.socket = new WebSocket(url);
          App.socket.addEventListener('open', () => {
            PopUpWindow.removeWindow();
            App.errorWindow = undefined;
            if (this.isLogined) {
              this.authorize();
            }
            clearInterval(App.reconnectingInterval);
            App.reconnectingInterval = 0;
          });
        }, 2000);
      }
    });
  }

  toInformation() {
    this.info.addEventListener('click', () => {
      this.clearPage();
      this.main.append(informationWindow.informationWrapper);
      this.fromInformation();
    });
  }

  fromInformation() {
    informationWindow.returnButton.addEventListener('click', () => {
      this.clearPage();
      this.main.append(this.prevPage);
    });
  }

  sendLogoutRequest() {
    const request = new LogoutRequest(this.login, this.password);
    App.socket.send(JSON.stringify(request));
  }

  toLoginPage() {
    this.clearPage();
    this.isLogined = false;
    this.main.append(formWrapper);
    this.info = infoButton;
    this.prevPage = formWrapper;
  }

  clearPage() {
    this.main.innerHTML = '';
  }
}

const app = new App();
app.main.append(formWrapper);
app.start();
