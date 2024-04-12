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
  name?: string;
  labelText?: string;
}
