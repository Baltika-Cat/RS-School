import App from './components/app/app';
import './global.css';

const switchTheme = document.querySelector('.switch-label');
const body = document.body;

if (switchTheme) {
    switchTheme.addEventListener('click', () => {
        if (!body.classList.contains('light-theme')) {
            console.log(true);
            body.classList.add('light-theme');
        } else {
            body.classList.remove('light-theme');
        }
    });
}

const app = new App();
app.start();
