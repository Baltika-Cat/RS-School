import { buttonTag, div, pTag } from '../tags';
import './pop-up-window-styles.css';

export default class PopUpWindow {
  static popupWrapper = div('popup-wrapper', document.body);

  static background = div('background', PopUpWindow.popupWrapper);

  static window = div('popup-window', PopUpWindow.popupWrapper);

  static loadingCircle = div('loading', PopUpWindow.window);

  static descriptionWrapper = div('description-wrapper', PopUpWindow.window);

  static problemDescription = pTag('problem-description', PopUpWindow.descriptionWrapper, '');

  static button = buttonTag('button', PopUpWindow.descriptionWrapper, 'Ясненько');

  constructor(errorMessage = 'reconnection') {
    if (errorMessage.includes('reconnection')) {
      PopUpWindow.problemDescription.textContent = 'Идет восстановление соединения';
      PopUpWindow.loadingCircle.classList.remove('invisible');
      PopUpWindow.button.classList.add('invisible');
      PopUpWindow.generateWindow();
    }
    if (errorMessage.includes('password')) {
      PopUpWindow.problemDescription.textContent = 'Неверный пароль';
      PopUpWindow.addButton();
      PopUpWindow.generateWindow();
    }
    if (errorMessage.includes('login')) {
      PopUpWindow.problemDescription.textContent = 'Пользователь с таким именем уже авторизован';
      PopUpWindow.addButton();
      PopUpWindow.generateWindow();
    }
    PopUpWindow.button.addEventListener('click', () => {
      PopUpWindow.removeWindow();
    });
  }

  static addButton() {
    PopUpWindow.loadingCircle.classList.add('invisible');
    PopUpWindow.button.classList.remove('invisible');
  }

  static removeWindow() {
    PopUpWindow.popupWrapper.classList.add('invisible');
  }

  static generateWindow() {
    PopUpWindow.popupWrapper.classList.remove('invisible');
  }
}

PopUpWindow.removeWindow();
