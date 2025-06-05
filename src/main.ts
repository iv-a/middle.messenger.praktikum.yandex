import './assets/styles/index.css';
import { HELPERS, registerHelpers } from './utils';
import {
  ChatsPage,
  ErrorPage,
  HomePage,
  SettingsPage,
  SignInPage,
  SignUpPage,
} from './pages';

registerHelpers(HELPERS);

const pages = {
  home: new HomePage({}),
  'sign-in': new SignInPage({}),
  'sign-up': new SignUpPage({}),
  settings: new SettingsPage({}),
  '404': new ErrorPage({
    code: 404,
    description: 'This page could not be found.',
  }),
  '500': new ErrorPage({
    code: 500,
    description: 'Something went wrong.',
  }),
  chats: new ChatsPage({ chatName: 'William Smith' }),
} as const;

const navigate = (page: keyof typeof pages) => {
  const app = document.getElementById('app');

  const block = pages[page];

  if (app && block) {
    app.innerHTML = '';
    app.appendChild(block.getContent());
    block.dispatchComponentDidMount();
  }
};

type PageName = keyof typeof pages;

const handleRouting = () => {
  const hash = window.location.hash.slice(2);
  const page = (hash || 'home') as PageName;

  if (pages[page]) {
    navigate(page);
  } else {
    navigate('404');
  }
};

window.addEventListener('hashchange', handleRouting);
window.addEventListener('DOMContentLoaded', handleRouting);
