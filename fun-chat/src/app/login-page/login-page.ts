import { div, form, input, buttonTag, pTag } from '../shared/tags';
import './login-page-style.css';

class LoginWindow {
  formWrapper = div('form-wrapper');

  loginForm = form('login-form', this.formWrapper, 'login-form');

  infoButton = buttonTag('button', this.formWrapper, 'Инфо');

  inputLoginWrapper = div('input-wrapper', this.loginForm);

  inputPasswordWrapper = div('input-wrapper', this.loginForm);

  loginOptions = {
    className: 'login-input',
    type: 'text',
    parent: this.inputLoginWrapper,
    placeholder: 'Логин',
    id: 'login-input',
    labelText: 'Введите логин',
  };

  loginInput = input(this.loginOptions);

  failedLoginValidation = pTag('failed-validation', this.inputLoginWrapper, '');

  passwordOptions = {
    className: 'login-input',
    type: 'password',
    parent: this.inputPasswordWrapper,
    placeholder: 'Пароль',
    id: 'password-input',
    labelText: 'Введите пароль',
  };

  passwordInput = input(this.passwordOptions);

  failedPasswordValidation = pTag('failed-validation', this.inputPasswordWrapper, '');

  loginButton = buttonTag('button', this.loginForm, 'Войти');

  constructor() {
    this.loginInput.required = true;
    this.loginInput.minLength = 4;
    this.passwordInput.required = true;
    this.passwordInput.minLength = 4;
  }
}

export default new LoginWindow();
