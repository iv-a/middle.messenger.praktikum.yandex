import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import './assets/styles/index.css';
import { HELPERS, registerHelpers, registerPartialComponents } from './utils';
import alertIcon from './assets/icons/warning-octagon.svg?raw';
import logoIcon from './assets/icons/logo.svg?raw';

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
  'sign-in': [
    Pages.SignIn.Component,
    {
      styles: Pages.SignIn.styles,
      btnStyles: Components.Button.styles,
      inputStyles: Components.Input.styles,
      alertIcon,
      logoIcon,
      inputs: [
        {
          inputId: 'login',
          name: 'login',
          placeholder: 'Login',
          label: 'Login',
          value: '',
        },
        {
          inputId: 'password',
          name: 'password',
          placeholder: 'Password',
          label: 'Password',
          value: '',
          type: 'password',
        },
      ],
    },
  ],
  'sign-up': [
    Pages.SignUp.Component,
    {
      styles: Pages.SignUp.styles,
      btnStyles: Components.Button.styles,
      inputStyles: Components.Input.styles,
      alertIcon,
      logoIcon,
      inputs: [
        {
          inputId: 'email',
          name: 'email',
          placeholder: 'Email',
          label: 'Email',
          value: '',
          helpText: 'Enter a valid email you have access to.',
          type: 'email',
        },
        {
          inputId: 'login',
          name: 'login',
          placeholder: 'Login',
          label: 'Login',
          value: '',
          helpText: '3–16 characters. Letters, numbers, or underscores.',
        },
        {
          inputId: 'first_name',
          name: 'first_name',
          placeholder: 'First Name',
          label: 'First Name',
          value: '',
          helpText: 'Use your real first name.',
        },
        {
          inputId: 'second_name',
          name: 'second_name',
          placeholder: 'Second Name',
          label: 'Second Name',
          value: '',
          helpText: 'Use your real last name.',
        },
        {
          inputId: 'phone',
          name: 'phone',
          placeholder: 'Phone number',
          label: 'Phone number',
          value: '',
          helpText: 'Include country code (e.g. +7).',
          type: 'tel',
        },
        {
          inputId: 'password',
          name: 'password',
          placeholder: 'Password',
          label: 'Password',
          value: '',
          helpText: '8+ characters with letters, numbers & symbols.',
          type: 'password',
        },
        {
          inputId: 'confirm_password',
          name: 'confirm_password',
          placeholder: 'Confirm Password',
          label: 'Confirm Password',
          value: '',
          helpText: 'Repeat your password exactly.',
          type: 'password',
        },
      ],
    },
  ],
};

registerHelpers(HELPERS);
registerPartialComponents(Components);

const app = document.getElementById('app');
const [source, context] = pages['sign-up'];

console.log({ app, pages });

const templatingFunction = Handlebars.compile(source);
const html = templatingFunction(context);
// console.log({ html, app});

if (app) app.innerHTML = html;
