import { buttonTag, mainTag } from './shared/tags';
import AuthenticationRequest from './shared/request-classes/authentication-request';
import LogoutRequest from './shared/request-classes/logout-request';
import loginWindow from './login-page/login-page';

const url = 'ws://127.0.0.1:4000';

class App {
  main = mainTag('main');

  static button = buttonTag('login-button', loginWindow.loginForm, 'meow');

  static socket: WebSocket;

  static interval: number | undefined;

  login = '';

  password = '';

  start() {
    if (App.interval) {
      clearInterval(App.interval);
    }
    App.socket = new WebSocket(url);
    // console.log('socket', App.socket);

    this.submitForm();

    /* App.socket.addEventListener('message', (event) => {
      if (event.data.type === 'USER_EXTERNAL_LOGIN') {
      }
    }); */
    this.reconnection();
  }

  submitForm() {
    loginWindow.loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.login = loginWindow.loginInput.value;
      this.password = loginWindow.loginInput.value;
      const request = new AuthenticationRequest(this.login, this.password);
      App.socket.send(JSON.stringify(request));
      // console.log(request);
      App.socket.addEventListener('message', (e) => {
        const message = JSON.parse(e.data);
        if (message.type !== 'ERROR') {
          this.clearPage();
          App.button = buttonTag('login-button', this.main, 'Log Out');
          this.logout();
        }
      });
    });
  }

  reconnection() {
    App.socket.addEventListener('close', () => {
      App.interval = setInterval(() => {
        this.start();
      }, 2000);
    });
  }

  logout() {
    // console.log(App.button);
    App.button.addEventListener('click', () => {
      // console.log(true);
      const request = new LogoutRequest(this.login, this.password);
      App.socket.send(JSON.stringify(request));
      App.socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        if (message.type !== 'ERROR') {
          this.clearPage();
          this.main.append(loginWindow.formWrapper);
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
app.main.append(loginWindow.formWrapper);
app.start();
