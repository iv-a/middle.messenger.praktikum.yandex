import { icons } from '../../assets/icons';
import { Header, SignUpForm } from '../../components';
import { Block } from '../../core';
import rawTemplate from './sign-up.hbs?raw';
import styles from './sign-up.module.css';

export interface SignUpPageProps {
  [key: string]: unknown;
}

export class SignUpPage extends Block<SignUpPageProps> {
  constructor(props: SignUpPageProps) {
    super('main', {
      ...props,
      Header: new Header({
        logoIcon: icons.logoIcon,
        title: 'Create your account',
        subtitle: 'Join Toki and start messaging in seconds.',
      }),
      SignUpForm: new SignUpForm(),
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
