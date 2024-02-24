import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { Everything, NewsSourcesResponse } from '../../types/interfaces';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sourcesDiv = <HTMLDivElement>document.querySelector('.sources');
        sourcesDiv.addEventListener('click', (e) => this.controller.getNews(e, (data: Everything) => this.view.drawNews(data)));
        this.controller.getSources((data: NewsSourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
