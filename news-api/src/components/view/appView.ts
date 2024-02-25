import News from './news/news';
import Sources from './sources/sources';
import { Articles, Everything, NewsSources, NewsSourcesResponse } from '../../types/interfaces';
import { CallbackTypes } from '../controller/loader';

function isEverything(variable: CallbackTypes): variable is Everything {
    return true;
}

function isNewsSourcesResponse(variable: CallbackTypes): variable is NewsSourcesResponse {
    return true;
}

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: CallbackTypes): void {
        if (isEverything(data)) {
            const values: Articles[] = data?.articles ? data?.articles : [];
            this.news.draw(values);
        }
    }

    drawSources(data: CallbackTypes): void {
        if (isNewsSourcesResponse(data)) {
            const values: NewsSources[] = data?.sources ? data?.sources : [];
            this.sources.draw(values);
        }
    }
}

export default AppView;
