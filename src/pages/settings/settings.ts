import { icons } from '../../assets/icons';
import {
  Button,
  ChangeAvatarForm,
  ChangePasswordForm,
  Header,
  SectionHeading,
  UserInformationForm,
} from '../../components';
import { Block } from '../../core';
import rawTemplate from './settings.hbs?raw';
import styles from './settings.module.css';

export interface SettingsPageProps {
  [key: string]: unknown;
}

export class SettingsPage extends Block<SettingsPageProps> {
  constructor(props: SettingsPageProps) {
    super('div', {
      ...props,
      Header: new Header({
        logoIcon: icons.logoIcon,
        title: 'Settings',
        subtitle: 'Manage your account settings.',
      }),
      ToChatsButton: new Button({
        tagName: 'a',
        attrs: {
          href: '#/',
        },
        variant: 'outline',
        text: 'Back to Chats',
        size: 'm',
        block: true,
        icon: icons.caretLeftIcon,
        prefix: true,
      }),
      BasicInfoHeading: new SectionHeading({
        title: 'Basic information',
        subtitle:
          'View and update your personal details and account information.',
      }),
      UserInformationForm: new UserInformationForm(),
      ChangePasswordHeading: new SectionHeading({
        title: 'Change password',
        subtitle: 'Update your password to keep your account secure.',
      }),
      ChangePasswordForm: new ChangePasswordForm(),
      ChangeAvatarHeading: new SectionHeading({
        title: 'Avatar',
        subtitle:
          'Avatar is your profile picture - everyone who visits your profile will see this.',
      }),
      ChangeAvatarForm: new ChangeAvatarForm(),
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
