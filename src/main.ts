// import Handlebars from 'handlebars';
// import { Components, componentsStyles } from './components';
// import * as Pages from './pages';
import { icons } from './assets/icons';
import './assets/styles/index.css';
import { HELPERS, registerHelpers } from './utils';

import { Button, Avatar } from './components';

// const pages = {
//   home: [
//     Pages.HomePage.Component,
//     {
//       styles: Pages.HomePage.styles,
//       ...componentsStyles,
//       ...icons,
//       ...images,
//     },
//   ],
//   'sign-in': [
//     Pages.SignIn.Component,
//     {
//       styles: Pages.SignIn.styles,
//       ...componentsStyles,
//       ...icons,
//       inputs: [
//         {
//           inputId: 'login',
//           name: 'login',
//           placeholder: 'Login',
//           label: 'Login',
//           value: '',
//         },
//         {
//           inputId: 'password',
//           name: 'password',
//           placeholder: 'Password',
//           label: 'Password',
//           value: '',
//           type: 'password',
//         },
//       ],
//     },
//   ],
//   'sign-up': [
//     Pages.SignUp.Component,
//     {
//       styles: Pages.SignUp.styles,
//       ...componentsStyles,
//       ...icons,
//       inputs: [
//         {
//           inputId: 'email',
//           name: 'email',
//           placeholder: 'Email',
//           label: 'Email',
//           value: '',
//           helpText: 'Enter a valid email you have access to.',
//           type: 'email',
//         },
//         {
//           inputId: 'login',
//           name: 'login',
//           placeholder: 'Login',
//           label: 'Login',
//           value: '',
//           helpText: '3–16 characters. Letters, numbers, or underscores.',
//         },
//         {
//           inputId: 'first_name',
//           name: 'first_name',
//           placeholder: 'First Name',
//           label: 'First Name',
//           value: '',
//           helpText: 'Use your real first name.',
//         },
//         {
//           inputId: 'second_name',
//           name: 'second_name',
//           placeholder: 'Second Name',
//           label: 'Second Name',
//           value: '',
//           helpText: 'Use your real last name.',
//         },
//         {
//           inputId: 'phone',
//           name: 'phone',
//           placeholder: 'Phone number',
//           label: 'Phone number',
//           value: '',
//           helpText: 'Include country code (e.g. +7).',
//           type: 'tel',
//         },
//         {
//           inputId: 'password',
//           name: 'password',
//           placeholder: 'Password',
//           label: 'Password',
//           value: '',
//           helpText: '8+ characters with letters, numbers & symbols.',
//           type: 'password',
//         },
//         {
//           inputId: 'confirm_password',
//           name: 'confirm_password',
//           placeholder: 'Confirm Password',
//           label: 'Confirm Password',
//           value: '',
//           helpText: 'Repeat your password exactly.',
//           type: 'password',
//         },
//       ],
//     },
//   ],
//   settings: [
//     Pages.Settings.Component,
//     {
//       styles: Pages.Settings.styles,
//       ...componentsStyles,
//       ...icons,
//       ...images,
//       basicInformationInputs: [
//         {
//           inputId: 'login',
//           name: 'login',
//           placeholder: 'Login',
//           label: 'Login',
//           value: '',
//           helpText: '3–16 characters. Letters, numbers, or underscores.',
//         },
//         {
//           inputId: 'first_name',
//           name: 'first_name',
//           placeholder: 'First Name',
//           label: 'First Name',
//           value: '',
//           helpText: 'Use your real first name.',
//         },
//         {
//           inputId: 'second_name',
//           name: 'second_name',
//           placeholder: 'Second Name',
//           label: 'Second Name',
//           value: '',
//           helpText: 'Use your real last name.',
//         },
//         {
//           inputId: 'email',
//           name: 'email',
//           placeholder: 'Email',
//           label: 'Email',
//           value: '',
//           helpText: 'Enter a valid email you have access to.',
//           type: 'email',
//         },
//         {
//           inputId: 'phone',
//           name: 'phone',
//           placeholder: 'Phone number',
//           label: 'Phone number',
//           value: '',
//           helpText: 'Include country code (e.g. +7).',
//           type: 'tel',
//         },
//       ],
//       changePasswordInputs: [
//         {
//           inputId: 'oldPassword',
//           name: 'oldPassword',
//           placeholder: 'Password',
//           label: 'Verify current password',
//           value: '',
//           helpText: ' Use your current password.',
//           type: 'password',
//         },
//         {
//           inputId: 'newPassword',
//           name: 'newPassword',
//           placeholder: 'Password',
//           label: 'New password',
//           value: '',
//           helpText: '8+ characters with letters, numbers & symbols.',
//           type: 'password',
//         },
//         {
//           inputId: 'confirm_password',
//           name: 'confirm_password',
//           placeholder: 'Confirm Password',
//           label: 'Confirm Password',
//           value: '',
//           helpText: 'Repeat your password exactly.',
//           type: 'password',
//         },
//       ],
//     },
//   ],
//   '404': [
//     Pages.ErrorPage.Component,
//     {
//       code: '404',
//       description: 'This page could not be found.',
//       styles: Pages.ErrorPage.styles,
//       ...componentsStyles,
//       ...icons,
//       ...images,
//     },
//   ],
//   '500': [
//     Pages.ErrorPage.Component,
//     {
//       code: '500',
//       description: 'Something went wrong.',
//       styles: Pages.ErrorPage.styles,
//       ...componentsStyles,
//       ...icons,
//       ...images,
//     },
//   ],
//   chats: [
//     Pages.ChatsPage.Component,
//     {
//       styles: Pages.ChatsPage.styles,
//       ...componentsStyles,
//       ...icons,
//       ...images,
//       chats: [
//         {
//           avatarUrl:
//             'https://images.unsplash.com/photo-1747694944418-8f20b0f97d07?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//           displayName: 'William Smith',
//           time: '10:21',
//           message:
//             "Hi, let's have a meeting tomorrow to discuss the project...",
//           unread: 3,
//         },
//         {
//           avatarUrl:
//             'https://images.unsplash.com/photo-1747835369484-97d3f0f782ac?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//           displayName: 'Emily Johnson',
//           time: '09:45',
//           message: 'I reviewed the proposal. Looks good overall!',
//           unread: 1,
//         },
//         {
//           avatarUrl:
//             'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0',
//           displayName: 'Michael Brown',
//           time: '08:30',
//           message: 'Can we push the meeting to next week?',
//           unread: 0,
//         },
//         {
//           avatarUrl:
//             'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0',
//           displayName: 'Sarah Williams',
//           time: '14:10',
//           message: 'Great job on the last release!',
//           unread: 5,
//         },
//         {
//           avatarUrl:
//             'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0',
//           displayName: 'James Davis',
//           time: '11:55',
//           message: 'Let’s finalize the design today.',
//           unread: 2,
//         },
//         {
//           avatarUrl:
//             'https://plus.unsplash.com/premium_photo-1747054588575-3cf191c4e020?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//           displayName: 'Olivia Miller',
//           time: '16:32',
//           message: 'I’ll join the call in 5 mins.',
//           unread: 0,
//         },
//         {
//           avatarUrl:
//             'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0',
//           displayName: 'Daniel Garcia',
//           time: '13:27',
//           message: 'We need to review the budget by tomorrow.',
//           unread: 4,
//         },
//         {
//           avatarUrl:
//             'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0',
//           displayName: 'Sophia Martinez',
//           time: '07:12',
//           message: 'The server is up again. Everything is back to normal.',
//           unread: 0,
//         },
//         {
//           avatarUrl:
//             'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0',
//           displayName: 'David Lee',
//           time: '12:03',
//           message: 'Just updated the documents with latest changes.',
//           unread: 2,
//         },
//         {
//           avatarUrl:
//             'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0',
//           displayName: 'Isabella Taylor',
//           time: '15:19',
//           message: 'Let’s catch up after lunch.',
//           unread: 1,
//         },
//       ],
//       messages: [
//         {
//           message: 'Hey!',
//           time: '14:02',
//           self: false,
//         },
//         {
//           message:
//             'Hey, long time no see. How have you been? What are you up to these days?',
//           time: '14:03',
//           self: true,
//         },
//         {
//           message:
//             'I’ve been doing alright. Work has been pretty intense lately, but I try to find time to recharge. I’ve been going out of town on weekends to get some fresh air.',
//           time: '14:05',
//           self: false,
//         },
//         {
//           message:
//             'That sounds great. I’ve been thinking about taking a short trip myself. Even just a day or two away from the computer could really help. Lately, I’ve been glued to the screen nonstop.',
//           time: '14:07',
//           self: true,
//         },
//         {
//           message:
//             'Yeah, I know the feeling. When you’re deep in a project, it’s hard to take a break. I had the same thing last month. The only thing that helped was a full digital detox over the weekend.',
//           time: '14:09',
//           self: false,
//         },
//         {
//           message:
//             'Sounds like a plan. Do you usually work on a fixed schedule or just go with the flow?',
//           time: '14:10',
//           self: true,
//         },
//         {
//           message:
//             'More of a go-with-the-flow type, honestly. As long as I hit deadlines, I don’t stress about timing. I try to start by 10 AM, but evenings are flexible. If something’s urgent, I’ll work late. If not, I’ll hit the gym or read a bit.',
//           time: '14:12',
//           self: false,
//         },
//         {
//           message:
//             'I might try that approach too. My schedule’s been a mess lately. I wake up late, my whole day shifts, and by evening I’m too tired to do anything meaningful.',
//           time: '14:14',
//           self: true,
//         },
//         {
//           message: `I’ve been there. I used to go to bed super late, then wake up around noon, and wonder why I had no time. What helped me was building a simple morning routine: stretch a little, drink water, read 10–15 minutes.
//     That helped ground my day. It’s easier to stay focused after that. Don’t try to overhaul everything at once — just add one new habit each week. After a couple of months, your lifestyle shifts naturally.`,
//           time: '14:17',
//           self: false,
//         },
//         {
//           message: `That actually sounds really doable. I always tell myself I’ll start fresh on Monday or next month, but I keep going in circles. It’s frustrating — you feel stuck, even though you know the problem.
//     I think I’ll start small, like you said. Tomorrow, I’ll set my alarm for 8:30 and see how it feels.`,
//           time: '14:20',
//           self: true,
//         },
//       ],
//     },
//   ],
// };

registerHelpers(HELPERS);
// registerPartialComponents(Components);

// const navigate = (page: keyof typeof pages) => {
//   const app = document.getElementById('app');

//   const [source, context] = pages[page];

//   const templatingFunction = Handlebars.compile(source);
//   const html = templatingFunction(context);

//   if (app) app.innerHTML = html;
// };

// type PageName = keyof typeof pages;

// const handleRouting = () => {
//   const hash = window.location.hash.slice(2);
//   const page = (hash || 'home') as PageName;

//   if (pages[page]) {
//     navigate(page);

//     if (page === 'settings') {
//       const openModalButton = document.getElementById('updateAvatarBtn');
//       console.log(openModalButton);

//       openModalButton?.addEventListener('click', () => {
//         console.log('click');

//         (
//           document.getElementById('uploadAvatarModal') as HTMLDialogElement
//         )?.showModal();
//       });
//     }
//   } else {
//     navigate('404');
//   }
// };

// window.addEventListener('hashchange', handleRouting);
// window.addEventListener('DOMContentLoaded', handleRouting);

const root = document.getElementById('app');

// 1. Обычная кнопка <button>
const btn1 = new Button({
  tagName: 'button',
  text: 'Нажми меня',
  variant: 'primary',
  size: 'm',
  events: {
    click: () => alert('Кнопка нажата'),
  },
  attributes: { type: 'button' },
});
root!.appendChild(btn1.getContent());
btn1.dispatchComponentDidMount();

// 2. Кнопка-ссылка <a>
const btn2 = new Button({
  tagName: 'a',
  text: 'Открыть example.com',
  href: 'https://example.com',
  target: '_blank',
  variant: 'outline',
  size: 'l',
  attributes: { 'data-test': 'link-button' },
});
root!.appendChild(btn2.getContent());
btn2.dispatchComponentDidMount();

// 3. Иконка-кнопка (iconOnly)
const plusSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    viewBox="0 0 16 16">
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 8a.5.5 0 0 
      1-.5.5H8.5V11a.5.5 0 0 1-1 0V8.5H5a.5.5 0 0 1 0-1h2.5V5a.5.5 
      0 0 1 1 0v2.5H11a.5.5 0 0 1 .5.5z"/>
  </svg>
`;
const btn3 = new Button({
  text: '', // пустой для iconOnly
  icon: plusSvg,
  prefix: true, // иконка впереди текста (но текст нет, т. к. iconOnly)
  variant: 'primary',
  size: 'm',
  iconOnly: true,
  attributes: { type: 'button' },
});
root!.appendChild(btn3.getContent());
btn3.dispatchComponentDidMount();

// 4. Disabled + Loading + Block
const btn4 = new Button({
  text: 'Загружаем...',
  variant: 'destructive',
  size: 'm',
  loading: true,
  disabled: true,
  block: true,
});
root!.appendChild(btn4.getContent());
btn4.dispatchComponentDidMount();

const btn5 = new Button({
  tagName: 'button',
  text: 'Нажми меня',
  variant: 'outline',
  size: 'm',
  events: {
    click: () => alert('Кнопка нажата'),
  },
  attributes: { type: 'button' },
});
root!.appendChild(btn5.getContent());
btn4.dispatchComponentDidMount();

const btn6 = new Button({
  tagName: 'button',
  text: 'Нажми меня',
  variant: 'destructive',
  size: 'm',
  icon: icons.alertIcon,
  prefix: true,
  events: {
    click: () => alert('Кнопка нажата'),
  },
  attributes: { type: 'button' },
});
root!.appendChild(btn6.getContent());
btn6.dispatchComponentDidMount();
const avt1 = new Avatar({
  avatarUrl:
    'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0',
  size: 'xxl',
});

root!.appendChild(avt1.getContent());
avt1.dispatchComponentDidMount();
