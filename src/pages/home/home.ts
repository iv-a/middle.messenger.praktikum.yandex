import { icons } from '../../assets/icons';
import { Button, Header } from '../../components';
import { Block, Router } from '../../core';
import { ROUTES } from '../../utils';
import rawTemplate from './home.hbs?raw';
import styles from './home.module.css';

export interface HomePageProps {
  [key: string]: unknown;
}

export class HomePage extends Block<HomePageProps> {
  constructor(props: HomePageProps) {
    super('main', {
      ...props,
      Header: new Header({
        logoIcon: icons.logoIcon,
        title: 'Sprint 3',
        subtitle:
          'Use the buttons below and browser navigation to go to the appropriate page.',
      }),
      SignInButton: new Button({
        tagName: 'a',
        attrs: {
          href: ROUTES.SIGN_IN,
        },
        text: 'Sign In Page',
        variant: 'primary',
        size: 'm',
        block: true,
        icon: icons.arrowRightIcon,
        suffix: true,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            Router.getInstance().go(ROUTES.SIGN_IN);
          },
        },
      }),
      SignUpButton: new Button({
        tagName: 'a',
        attrs: {
          href: ROUTES.SIGN_UP,
        },
        text: 'Sign Up Page',
        variant: 'primary',
        size: 'm',
        block: true,
        icon: icons.arrowRightIcon,
        suffix: true,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            Router.getInstance().go(ROUTES.SIGN_UP);
          },
        },
      }),
      ChatsButton: new Button({
        tagName: 'a',
        attrs: {
          href: ROUTES.MESSENGER,
        },
        text: 'Chats Page',
        variant: 'primary',
        size: 'm',
        block: true,
        icon: icons.arrowRightIcon,
        suffix: true,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            Router.getInstance().go(ROUTES.MESSENGER);
          },
        },
      }),
      SettingsButton: new Button({
        tagName: 'a',
        attrs: {
          href: ROUTES.SETTINGS,
        },
        text: 'Settings Page',
        variant: 'primary',
        size: 'm',
        block: true,
        icon: icons.arrowRightIcon,
        suffix: true,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            Router.getInstance().go(ROUTES.SETTINGS);
          },
        },
      }),
      NotFoundButton: new Button({
        tagName: 'a',
        attrs: {
          href: ROUTES.NOT_FOUND,
        },
        text: 'Not Found Page',
        variant: 'primary',
        size: 'm',
        block: true,
        icon: icons.arrowRightIcon,
        suffix: true,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            Router.getInstance().go(ROUTES.NOT_FOUND);
          },
        },
      }),
      ServerErrorButton: new Button({
        tagName: 'a',
        attrs: {
          href: ROUTES.SERVER_ERROR,
        },
        text: 'Server Error Page',
        variant: 'primary',
        size: 'm',
        block: true,
        icon: icons.arrowRightIcon,
        suffix: true,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            Router.getInstance().go(ROUTES.SERVER_ERROR);
          },
        },
      }),
    });
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected init() {
    this._setClassName();
  }

  protected componentDidUpdate(): boolean {
    this._setClassName();
    return true;
  }

  protected render(): string {
    return rawTemplate;
  }

  private _setClassName() {
    this.props.className = styles.page;
  }
}
