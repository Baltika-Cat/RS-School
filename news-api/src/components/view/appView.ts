import News from './news/news';
import Sources from './sources/sources';
import { Articles, Everything, NewsSources, NewsSourcesResponse } from '../../types/interfaces';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Everything): void {
        const values: Articles[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: NewsSourcesResponse): void {
        const values: NewsSources[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
