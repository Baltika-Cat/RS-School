import AppLoader from './appLoader';
import { CallbackTypes, Callback } from './loader';
// import { Everything, NewsSourcesResponse } from '../../types/interfaces';

class AppController extends AppLoader {
    public getSources(callback: Callback<CallbackTypes>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<CallbackTypes>): void {
        const activeButton = document.querySelector('.active-source');
        if (activeButton) {
            activeButton.classList.remove('active-source');
        }
        let target = <EventTarget>e.target;
        if (target instanceof HTMLDivElement) {
            target.classList.add('active-source');
        } else if (target instanceof HTMLSpanElement && target.parentNode instanceof HTMLDivElement) {
            target.parentNode.classList.add('active-source');
        }
        const newsContainer = <EventTarget>e.currentTarget;

        while (target !== newsContainer) {
            if (target instanceof Element && newsContainer instanceof Element) {
                if (target!.classList.contains('source__item')) {
                    const sourceId = <string>target.getAttribute('data-source-id');
                    if (newsContainer!.getAttribute('data-source') !== sourceId) {
                        newsContainer!.setAttribute('data-source', sourceId!);
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }
                target = <EventTarget>target.parentNode;
            }
        }
    }
}

export default AppController;
