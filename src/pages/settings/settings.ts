import { icons } from '../../assets/icons';
import {
  Button,
  ChangeAvatarForm,
  ChangePasswordForm,
  Header,
  SectionHeading,
  UserInformationForm,
} from '../../components';
import { authController } from '../../controllers';
import { Block, Router } from '../../core';
import { withStore } from '../../hocs';
import { User } from '../../types';
import { ROUTES } from '../../utils';
import rawTemplate from './settings.hbs?raw';
import styles from './settings.module.css';

export interface SettingsPageProps {
  user: User | null;
  [key: string]: unknown;
}

class PureSettingsPage extends Block<SettingsPageProps> {
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
          href: '/',
        },
        variant: 'outline',
        text: 'Back to Chats',
        size: 'm',
        block: true,
        icon: icons.caretLeftIcon,
        prefix: true,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            Router.getInstance().go(ROUTES.MESSENGER);
          },
        },
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
    authController.getMe();
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected componentDidMount(): void {}

  protected init() {
    this._setClassName();
  }

  // protected componentDidUpdate(
  //   oldProps: SettingsPageProps,
  //   newProps: SettingsPageProps,
  // ): boolean {

  //   return true;
  // }

  // protected componentDidUpdate(): boolean {
  //   this._setClassName();
  //   return true;
  // }

  public render(): string {
    return rawTemplate;
  }

  private _setClassName() {
    this.props.className = styles.page;
  }
}

export const SettingsPage = withStore<SettingsPageProps>((state) => ({
  user: state.user,
}))(PureSettingsPage);
