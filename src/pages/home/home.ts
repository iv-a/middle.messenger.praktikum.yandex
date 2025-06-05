import { icons } from '../../assets/icons';
import { Button, Header } from '../../components';
import { Block } from '../../core';
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
        title: 'Sprint 2',
        subtitle:
          'Use the buttons below and browser navigation to go to the appropriate page.',
      }),
      SignInButton: new Button({
        tagName: 'a',
        attrs: {
          href: '#/sign-in',
        },
        text: 'Sign In Page',
        variant: 'primary',
        size: 'm',
        block: true,
        icon: icons.arrowRightIcon,
        suffix: true,
      }),
      SignUpButton: new Button({
        tagName: 'a',
        attrs: {
          href: '#/sign-up',
        },
        text: 'Sign Up Page',
        variant: 'primary',
        size: 'm',
        block: true,
        icon: icons.arrowRightIcon,
        suffix: true,
      }),
      ChatsButton: new Button({
        tagName: 'a',
        attrs: {
          href: '#/chats',
        },
        text: 'Chats Page',
        variant: 'primary',
        size: 'm',
        block: true,
        icon: icons.arrowRightIcon,
        suffix: true,
      }),
      SettingsButton: new Button({
        tagName: 'a',
        attrs: {
          href: '#/settings',
        },
        text: 'Settings Page',
        variant: 'primary',
        size: 'm',
        block: true,
        icon: icons.arrowRightIcon,
        suffix: true,
      }),
      NotFoundButton: new Button({
        tagName: 'a',
        attrs: {
          href: '#/404',
        },
        text: 'Not Found Page',
        variant: 'primary',
        size: 'm',
        block: true,
        icon: icons.arrowRightIcon,
        suffix: true,
      }),
      ServerErrorButton: new Button({
        tagName: 'a',
        attrs: {
          href: '#/500',
        },
        text: 'Server Error Page',
        variant: 'primary',
        size: 'm',
        block: true,
        icon: icons.arrowRightIcon,
        suffix: true,
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
