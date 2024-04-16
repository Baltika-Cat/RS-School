export interface Request {
  id: string;
  type: string;
}

export interface Authentication extends Request {
  payload: {
    user: {
      login: string;
      password: string;
    };
  };
}

export interface InputOptions {
  className: string;
  type: string;
  parent: HTMLElement;
  placeholder: string;
  id?: string;
  labelText?: string;
}

/* export interface LogoutOptions {
  socket: WebSocket;
  login: string;
  password: string;
} */
