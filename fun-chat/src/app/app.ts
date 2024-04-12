import AuthenticationRequest from './shared/classes/authentication-request-class';
import loginWindow from './login-page/login-page';

const url = 'ws://127.0.0.1:4000';

let interval: number | undefined;

function start() {
  console.log('Hello!');
  if (interval) {
    clearInterval(interval);
  }
  const socket = new WebSocket(url);

  loginWindow.loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const req = new AuthenticationRequest(loginWindow.loginInput.value, loginWindow.passwordInput.value);
    socket.send(JSON.stringify(req));

    socket.addEventListener('open', () => {
      console.log(req);
    });
  });

  socket.addEventListener('message', (event) => {
    console.log(true);
    if (event.data.type === 'USER_EXTERNAL_LOGIN') {
      // console.log
    }
    const data = JSON.parse(event.data);
    console.log(data);
  });

  socket.addEventListener('close', () => {
    console.log('bye!');
    interval = setInterval(start, 2000);
  });
}

start();
