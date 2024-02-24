import AppLoader from './appLoader';
import { CallbackReturns } from './loader';

class AppController extends AppLoader {
    getSources(callback: CallbackReturns) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: CallbackReturns): void {
        let target = <EventTarget>e.target;
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
                target = <EventTarget>target!.parentNode;
            }
        }
    }
}

export default AppController;