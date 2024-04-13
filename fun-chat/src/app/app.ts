import { buttonTag, mainTag } from './shared/tags';
import AuthenticationRequest from './shared/request-classes/authentication-request';
import LogoutRequest from './shared/request-classes/logout-request';
import loginWindow from './login-page/login-page';
import informationWindow from './information-page/information-page';

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

  button: HTMLButtonElement;

  static socket: WebSocket;

  static interval: number | undefined;

  login = '';

  password = '';

  prevPage: HTMLDivElement;

  constructor() {
    this.prevPage = formWrapper;
    this.button = buttonTag('login-button', loginForm, 'meow');
  }

  start() {
    if (App.interval) {
      clearInterval(App.interval);
    }
    App.socket = new WebSocket(url);
    // console.log('socket', App.socket);
    loginButton.classList.add('disabled');
    // console.log(loginInput.minLength)
    this.submitForm();
    this.toInformation();
    App.validateForm();

    /* App.socket.addEventListener('message', (event) => {
      if (event.data.type === 'USER_EXTERNAL_LOGIN') {
      }
    }); */
    this.reconnection();
  }

  submitForm() {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.login = loginInput.value;
      this.password = loginInput.value;
      const request = new AuthenticationRequest(this.login, this.password);
      App.socket.send(JSON.stringify(request));
      // console.log(request);
      App.socket.addEventListener('message', (e) => {
        const message = JSON.parse(e.data);
        if (message.type !== 'ERROR') {
          this.clearPage();
          this.button = buttonTag('login-button', this.main, 'Log Out');
          this.logout();
        }
      });
    });
  }

  static validateForm() {
    let loginValidation = false;
    let passwordValidation = false;
    loginInput.addEventListener('input', () => {
      if (!loginInput.value) {
        failedLoginValidation.textContent = 'Поле обязательно для заполнения';
        loginValidation = false;
        loginButton.classList.add('disabled');
      } else if (loginInput.value.length < loginInput.minLength) {
        failedLoginValidation.textContent = `Минимум ${loginInput.minLength} символа`;
        loginValidation = false;
        loginButton.classList.add('disabled');
      } else if (loginInput.value === loginInput.value.toLowerCase()) {
        failedLoginValidation.textContent = 'Должна быть хотя бы одна заглавная буква';
        loginValidation = false;
        loginButton.classList.add('disabled');
      } else {
        failedLoginValidation.textContent = '';
        loginValidation = true;
        if (passwordValidation) {
          loginButton.classList.remove('disabled');
        }
      }
    });
    passwordInput.addEventListener('input', () => {
      if (!passwordInput.value) {
        failedPasswordValidation.textContent = 'Поле обязательно для заполнения';
        passwordValidation = false;
        loginButton.classList.add('disabled');
      } else if (passwordInput.value.length < passwordInput.minLength) {
        failedPasswordValidation.textContent = `Минимум ${passwordInput.minLength} символа`;
        passwordValidation = false;
        loginButton.classList.add('disabled');
      } else if (passwordInput.value === passwordInput.value.toLowerCase()) {
        failedPasswordValidation.textContent = 'Должна быть хотя бы одна заглавная буква';
        passwordValidation = false;
        loginButton.classList.add('disabled');
      } else {
        failedPasswordValidation.textContent = '';
        passwordValidation = true;
        if (loginValidation) {
          loginButton.classList.remove('disabled');
        }
      }
    });
  }

  reconnection() {
    App.socket.addEventListener('close', () => {
      App.interval = setInterval(() => {
        this.start();
      }, 2000);
    });
  }

  toInformation() {
    infoButton.addEventListener('click', () => {
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

  logout() {
    // console.log(App.button);
    this.button.addEventListener('click', () => {
      // console.log(true);
      const request = new LogoutRequest(this.login, this.password);
      App.socket.send(JSON.stringify(request));
      // console.log(true, request)
      App.socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        if (message.type !== 'ERROR') {
          this.clearPage();
          this.main.append(formWrapper);
          // console.log(message);
        }
        // console.log(event.data);
      });
    });
  }

  clearPage() {
    this.main.innerHTML = '';
  }
}

const app = new App();
app.main.append(formWrapper);
app.start();
