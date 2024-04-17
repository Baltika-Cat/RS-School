import { /* buttonTag, */ mainTag } from './shared/tags';
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

  // button: HTMLButtonElement;

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
    // this.button = buttonTag('login-button', loginForm, 'meow');
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
    App.checkInterval = setInterval(() => {
      // console.log(App.socket)
      this.reconnect();
    }, 2000);
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
          const mainPage = new MainPage(App.socket, this.login);
          this.prevPage = mainPage.mainPageWrapper;
          this.main.append(mainPage.mainPageWrapper);
          this.info = mainPage.infoButton;
          // console.log(this.info)
          this.toInformation();
          // this.button = buttonTag('login-button', this.main, 'Log Out');
          /* const logoutOptions = {
            socket: App.socket,
            login: this.login,
            password: this.password,
          }; */
          mainPage.logoutButton.addEventListener('click', () => {
            this.logout();
          });
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
    /* App.socket.addEventListener('message', (e) => {
      console.log(e.data)
    }) */
    App.socket.addEventListener('close', () => {
      if (!App.errorWindow) {
        App.errorWindow = new PopUpWindow();
      }
      if (!App.reconnectingInterval) {
        App.reconnectingInterval = setInterval(() => {
          App.socket = new WebSocket(url);
          // console.log('try connect')
          App.socket.addEventListener('open', () => {
            // console.log('open')
            PopUpWindow.removeWindow();
            App.errorWindow = undefined;
            if (this.isLogined) {
              this.authorize();
            }
            clearInterval(App.reconnectingInterval);
            App.reconnectingInterval = 0;
            // console.log(true);
            /* App.socket.addEventListener('message', (e) => {
                console.log(e.data);
              }); */
          });
          // console.log(true);
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

  logout() {
    const request = new LogoutRequest(this.login, this.password);
    App.socket.send(JSON.stringify(request));
    App.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.type !== 'ERROR') {
        this.clearPage();
        this.isLogined = false;
        this.main.append(formWrapper);
        this.info = infoButton;
        this.prevPage = formWrapper;
        // console.log(message);
      }
      // console.log(event.data);
    });
  }

  toLoginPage() {
    this.clearPage();
    this.isLogined = false;
    this.main.append(formWrapper);
  }

  clearPage() {
    this.main.innerHTML = '';
  }
}

const app = new App();
app.main.append(formWrapper);
app.start();
