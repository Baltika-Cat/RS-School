import { buttonTag, mainTag } from './shared/tags';
import AuthenticationRequest from './shared/request-classes/authentication-request';
import LogoutRequest from './shared/request-classes/logout-request';
import loginWindow from './login-page/login-page';
import informationWindow from './information-page/information-page';
import PopUpWindow from './shared/pop-up-windows/pop-up-windows';

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

  button: HTMLButtonElement;

  static socket: WebSocket;

  static interval: number | undefined;

  static errorWindow: PopUpWindow | undefined;

  login = '';

  password = '';

  prevPage: HTMLDivElement;

  loginValidation = false;

  passwordValidation = false;

  constructor() {
    this.prevPage = formWrapper;
    this.button = buttonTag('login-button', loginForm, 'meow');
  }

  start() {
    App.socket = new WebSocket(url);
    // console.log('socket', App.socket);
    loginButton.classList.add('disabled');
    this.submitForm();
    this.toInformation();
    this.validateLogin();
    this.validatePassword();

    /* App.socket.addEventListener('message', (event) => {
      if (event.data.type === 'USER_EXTERNAL_LOGIN') {
      }
    }); */
    this.reconnect();
  }

  authorize() {
    const request = new AuthenticationRequest(this.login, this.password);
    App.socket.send(JSON.stringify(request));
  }

  submitForm() {
    loginForm.addEventListener('submit', (event) => {
      // console.log(App.socket);
      event.preventDefault();
      this.login = loginInput.value;
      this.password = passwordInput.value;
      this.authorize();
      // console.log(request);
      App.socket.addEventListener('message', (e) => {
        // console.log(e.data);
        const message = JSON.parse(e.data);
        if (message.type !== 'ERROR') {
          this.clearPage();
          this.isLogined = true;
          this.button = buttonTag('login-button', this.main, 'Log Out');
          this.logout();
          // console.log(this.login, this.password);
        } else {
          const errorMessage = message.payload.error;
          App.errorWindow = new PopUpWindow(errorMessage);
          // console.log(message)
        }
      });
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
      App.interval = setInterval(() => {
        App.socket = new WebSocket(url);
        App.socket.addEventListener('open', () => {
          clearInterval(App.interval);
          // console.log(true);
          PopUpWindow.removeWindow();
          App.errorWindow = undefined;
          if (this.isLogined) {
            // console.log(true);
            this.authorize();
          }
          /* App.socket.addEventListener('message', (e) => {
              console.log(e.data);
            }); */
        });
        // console.log(true);
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
    this.button.addEventListener('click', () => {
      const request = new LogoutRequest(this.login, this.password);
      App.socket.send(JSON.stringify(request));
      App.socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        if (message.type !== 'ERROR') {
          this.clearPage();
          this.isLogined = false;
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
