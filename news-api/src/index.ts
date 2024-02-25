import App from './components/app/app';
import './global.css';

const switchTheme = document.querySelector('.slider');
const html = document.querySelector('html');

if (switchTheme && html) {
    switchTheme.addEventListener('click', () => {
        if (!html.classList.contains('light-theme')) {
            html.classList.add('light-theme');
        } else {
            html.classList.remove('light-theme');
        }
    });
}

const app = new App();
app.start();
