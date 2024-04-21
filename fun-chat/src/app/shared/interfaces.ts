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

export interface UserLogined {
  login: string;
  isLogined: boolean;
}

export interface Message {
  id: string | null;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
}

/* export interface UnreadMessages {
  login: string;
  messagesId: string[];
} */

// export type historyEvent = 'get-history-login' | 'get-history-click' | 'get-history-search';

/* export interface LogoutOptions {
  socket: WebSocket;
  login: string;
  password: string;
} */
