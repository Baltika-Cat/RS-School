import { div, form, input, buttonTag } from '../shared/tags';
import './login-page-style.css';

class LoginWindow {
  formWrapper = div('form-wrapper');

  loginForm = form('login-form', this.formWrapper, 'login-form');

  inputLoginWrapper = div('input-wrapper', this.loginForm);

  inputPasswordWrapper = div('input-wrapper', this.loginForm);

  loginOptions = {
    className: 'login-input',
    type: 'text',
    parent: this.inputLoginWrapper,
    placeholder: 'Логин',
    name: 'login-input',
    labelText: 'Введите логин',
  };

  loginInput = input(this.loginOptions);

  passwordOptions = {
    className: 'login-input',
    type: 'password',
    parent: this.inputPasswordWrapper,
    placeholder: 'Пароль',
    name: 'password-input',
    labelText: 'Введите пароль',
  };

  passwordInput = input(this.passwordOptions);

  loginButton = buttonTag('login-button', this.loginForm, 'Войти');
}

export default new LoginWindow();
