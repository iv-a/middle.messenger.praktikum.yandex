import Handlebars from "handlebars";
import * as Components from './components';
import * as Pages from './pages';
import './assets/styles/index.css';
import { HELPERS, registerHelpers, registerPartials } from "./utils";

const pages = {
    'home': [
        Pages.HomePage.Component,
        {
            styles: Pages.HomePage.styles,
            btnStyles: Components.Button.styles,
            // inputStyles: Components.Input.styles,
            // formData: { // Пример данных для формы
            // username: 'john.doe',
            // }
        }
    ],
};

registerHelpers(HELPERS);
registerPartials(Components);

const app = document.getElementById('app');
const [source, context] = pages.home;

console.log({ app, pages });

const templatingFunction = Handlebars.compile(source);
const html = templatingFunction(context);
// console.log({ html, app});

if (app) app.innerHTML = html;