import { icons } from '../../assets/icons';
import {
  Avatar,
  Button,
  ChatItem,
  Input,
  MessageForm,
  MessageItem,
} from '../../components';
import { Block } from '../../core';
import rawTemplate from './chats.hbs?raw';
import styles from './chats.module.css';

export interface ChatsPageProps {
  chatName: string;
  [key: string]: unknown;
}

export class ChatsPage extends Block<ChatsPageProps> {
  constructor(props: ChatsPageProps) {
    super('main', {
      ...props,
      logoIcon: icons.logoIcon,
      SettingsButton: new Button({
        tagName: 'a',
        attrs: {
          href: '#/settings',
        },
        variant: 'outline',
        size: 'm',
        iconOnly: true,
        icon: icons.gearSixIcon,
      }),
      SearchInput: new Input({
        inputId: 'search',
        name: 'search',
        placeholder: 'Search',
        type: 'text',
      }),
      ChatItem: new ChatItem({
        avatarUrl:
          'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0',
        displayName: 'Isabella Taylor',
        time: '15:19',
        message: 'Let’s catch up after lunch.',
        unread: 1,
      }),
      Avatar: new Avatar({
        avatarUrl:
          'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0',
        size: 's',
      }),
      OptionsButton: new Button({
        tagName: 'button',
        type: 'button',
        variant: 'outline',
        size: 'm',
        iconOnly: true,
        icon: icons.dotsThreeIcon,
      }),
      MessageItem: new MessageItem({
        isSelf: true,
        message: 'sdasdasdas',
        time: '10:32',
      }),
      MessageForm: new MessageForm(),
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
