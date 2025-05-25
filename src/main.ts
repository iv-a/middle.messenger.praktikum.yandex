import Handlebars from 'handlebars';
import { Components, componentsStyles } from './components';
import * as Pages from './pages';
import { icons } from './assets/icons';
import './assets/styles/index.css';
import { HELPERS, registerHelpers, registerPartialComponents } from './utils';
import { images } from './assets/images';

const pages = {
  home: [
    Pages.HomePage.Component,
    {
      styles: Pages.HomePage.styles,
      ...componentsStyles,
      ...icons,
      ...images,
    },
  ],
  'sign-in': [
    Pages.SignIn.Component,
    {
      styles: Pages.SignIn.styles,
      ...componentsStyles,
      ...icons,
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
      ...componentsStyles,
      ...icons,
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
  settings: [
    Pages.Settings.Component,
    {
      styles: Pages.Settings.styles,
      ...componentsStyles,
      ...icons,
      ...images,
      basicInformationInputs: [
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
          inputId: 'email',
          name: 'email',
          placeholder: 'Email',
          label: 'Email',
          value: '',
          helpText: 'Enter a valid email you have access to.',
          type: 'email',
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
      ],
      changePasswordInputs: [
        {
          inputId: 'oldPassword',
          name: 'oldPassword',
          placeholder: 'Password',
          label: 'Verify current password',
          value: '',
          helpText: ' Use your current password.',
          type: 'password',
        },
        {
          inputId: 'newPassword',
          name: 'newPassword',
          placeholder: 'Password',
          label: 'New password',
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
  '404': [
    Pages.ErrorPage.Component,
    {
      code: '404',
      description: 'This page could not be found.',
      styles: Pages.ErrorPage.styles,
      ...componentsStyles,
      ...icons,
      ...images,
    },
  ],
  '500': [
    Pages.ErrorPage.Component,
    {
      code: '500',
      description: 'Something went wrong.',
      styles: Pages.ErrorPage.styles,
      ...componentsStyles,
      ...icons,
      ...images,
    },
  ],
};

registerHelpers(HELPERS);
registerPartialComponents(Components);

const navigate = (page: keyof typeof pages) => {
  const app = document.getElementById('app');

  const [source, context] = pages[page];

  const templatingFunction = Handlebars.compile(source);
  const html = templatingFunction(context);

  if (app) app.innerHTML = html;
};

type PageName = keyof typeof pages;

const handleRouting = () => {
  const hash = window.location.hash.slice(2);
  const page = (hash || 'home') as PageName;

  if (pages[page]) {
    navigate(page);

    if (page === 'settings') {
      const openModalButton = document.getElementById('updateAvatarBtn');
      console.log(openModalButton);

      openModalButton?.addEventListener('click', () => {
        console.log('click');

        (
          document.getElementById('uploadAvatarModal') as HTMLDialogElement
        )?.showModal();
      });
    }
  } else {
    document.getElementById('app')!.innerHTML =
      '<h1>404 — Страница не найдена</h1>';
  }
};

window.addEventListener('hashchange', handleRouting);
window.addEventListener('DOMContentLoaded', handleRouting);
