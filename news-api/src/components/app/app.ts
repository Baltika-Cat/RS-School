import AppController from '../controller/controller';
import { AppView } from '../view/appView';
// import { Everything, NewsSourcesResponse } from '../../types/interfaces';
import { CallbackTypes } from '../controller/loader';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sourcesDiv = <HTMLDivElement>document.querySelector('.sources');
        sourcesDiv.addEventListener('click', (e) => this.controller.getNews(e, (data: CallbackTypes) => this.view.drawNews(data)));
        this.controller.getSources((data: CallbackTypes) => this.view.drawSources(data));
    }
}

export default App;
