import './sources.css';
import { NewsSources } from '../../../types/interfaces';

class Sources {
    draw(data: NewsSources[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');

        data.forEach((item: NewsSources): void => {
            const sourceClone = <HTMLTemplateElement>sourceItemTemp.content.cloneNode(true);

            sourceClone.querySelector('.source__item-name')!.textContent = item.name;
            sourceClone.querySelector('.source__item')!.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')!.append(fragment);
    }
}

export default Sources;
