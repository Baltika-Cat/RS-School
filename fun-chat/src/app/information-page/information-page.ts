import { div, buttonTag, pTag, h2Tag, aTag } from '../shared/tags';
import './information-page-style.css';

class InformationWindow {
  informationWrapper = div('info-wrapper');

  informationTitle = h2Tag('title', this.informationWrapper, 'Информация');

  informationText = `Приветствую тебя, любитель(ница) чатиться!\n
    Огромное спасибо, что уделил(а) время моему проекту.\n
    Искренне надеюсь, что мой "потрясающий" дизайн не вызовет кровотечение из твоих глаз)\n
    \n
    Если что, вот ссылочка на мой Github - `;

  informationDescription = pTag('description', this.informationWrapper, this.informationText);

  githubLink = aTag('link', this.informationDescription, 'https://github.com/Baltika-Cat', 'Baltika-Cat');

  returnButton = buttonTag('button', this.informationWrapper, 'Назад');
}

export default new InformationWindow();
