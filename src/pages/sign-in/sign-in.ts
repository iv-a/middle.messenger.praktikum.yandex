import { icons } from '../../assets/icons';
import { Header, Link, SignInForm } from '../../components';
import { Block } from '../../core';
import { ROUTES } from '../../utils';
import rawTemplate from './sign-in.hbs?raw';
import styles from './sign-in.module.css';

export interface SignInPageProps {
  [key: string]: unknown;
}

export class SignInPage extends Block<SignInPageProps> {
  constructor(props: SignInPageProps) {
    super('main', {
      ...props,
      Header: new Header({
        logoIcon: icons.logoIcon,
        title: 'Welcome back',
        subtitle: 'Enter your credentials to access your account.',
      }),
      SignInForm: new SignInForm(),
      SignUpLink: new Link({ to: ROUTES.SIGN_UP, title: 'Sign up' }),
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
