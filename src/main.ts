import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import "./assets/styles/index.css";
import { HELPERS, registerHelpers, registerPartialComponents } from "./utils";
import alertIcon from "./assets/icons/warning-octagon.svg?raw";
import logoIcon from "./assets/icons/logo.svg?raw";

const pages = {
  home: [
    Pages.HomePage.Component,
    {
      styles: Pages.HomePage.styles,
      btnStyles: Components.Button.styles,
      inputStyles: Components.Input.styles,
      alertIcon,
      // formData: { // Пример данных для формы
      // username: 'john.doe',
      // }
    },
  ],
  "sign-in": [
    Pages.SignIn.Component,
    {
      styles: Pages.SignIn.styles,
      btnStyles: Components.Button.styles,
      inputStyles: Components.Input.styles,
      alertIcon,
      logoIcon,
    },
  ],
};

registerHelpers(HELPERS);
registerPartialComponents(Components);

const app = document.getElementById("app");
const [source, context] = pages["sign-in"];

console.log({ app, pages });

const templatingFunction = Handlebars.compile(source);
const html = templatingFunction(context);
// console.log({ html, app});

if (app) app.innerHTML = html;
