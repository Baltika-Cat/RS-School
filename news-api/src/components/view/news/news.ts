import './news.css';
import { Articles } from '../../../types/interfaces';

class News {
    draw(data: Articles[]): void {
        const news: Articles[] = data.length >= 10 ? data.filter((_item: Articles, idx: number): boolean => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = <HTMLTemplateElement>document.querySelector('#newsItemTemp');

        news.forEach((item: Articles, idx: number): void => {
            const newsClone = <HTMLTemplateElement>newsItemTemp.content.cloneNode(true);

            if (idx % 2) newsClone.querySelector('.news__item')!.classList.add('alt');

            const newsClonePhoto = <HTMLDivElement>newsClone.querySelector('.news__meta-photo');
            newsClonePhoto.style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            newsClone.querySelector('.news__meta-author')!.textContent = item.author || item.source.name;
            newsClone.querySelector('.news__meta-date')!.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            newsClone.querySelector('.news__description-title')!.textContent = item.title;
            newsClone.querySelector('.news__description-source')!.textContent = item.source.name;
            newsClone.querySelector('.news__description-content')!.textContent = item.description;
            newsClone.querySelector('.news__read-more a')!.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        document.querySelector('.news')!.innerHTML = '';
        document.querySelector('.news')!.appendChild(fragment);
    }
}

export default News;
