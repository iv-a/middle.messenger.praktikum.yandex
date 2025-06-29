import { icons } from '../../assets/icons';
import { Button, Chat, ChatItem, Input } from '../../components';
import { chatsController } from '../../controllers';
import { Block, Router } from '../../core';
import { BaseProps } from '../../core';
import { withStore } from '../../hocs';
import { IChat } from '../../types';
import { ROUTES } from '../../utils';
import rawTemplate from './chats.hbs?raw';
import styles from './chats.module.css';

export interface ChatsPageProps extends BaseProps {
  chats: Array<IChat>;
  chatItems?: Array<ChatItem>;
  [key: string]: unknown;
}

class PureChatsPage extends Block<ChatsPageProps> {
  constructor(props: ChatsPageProps) {
    super('main', {
      ...props,
      logoIcon: icons.logoIcon,
      SettingsButton: new Button({
        tagName: 'a',
        variant: 'outline',
        size: 'm',
        iconOnly: true,
        icon: icons.gearSixIcon,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            Router.getInstance().go(ROUTES.SETTINGS);
          },
        },
      }),
      SearchInput: new Input({
        inputId: 'search',
        name: 'search',
        placeholder: 'Search',
        type: 'text',
      }),
      OptionsButton: new Button({
        tagName: 'button',
        type: 'button',
        variant: 'outline',
        size: 'm',
        iconOnly: true,
        icon: icons.dotsThreeIcon,
      }),
      chatItems: props.chats?.map(
        ({ avatar, id, last_message, title, unread_count }) => {
          const { content, time } = last_message;
          return new ChatItem({
            avatarUrl: avatar,
            displayName: title,
            time,
            message: content,
            unread: unread_count,
          });
        },
      ),
      CreateChatButton: new Button({
        tagName: 'button',
        type: 'button',
        variant: 'primary',
        size: 'xl',
        iconOnly: true,
        icon: icons.plus,
        round: true,
      }),
      Chat: new Chat(),
    });
    chatsController.getChats({ limit: 50, offset: 0 });
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

  render(): string {
    return rawTemplate;
  }

  private _setClassName() {
    this.props.className = styles.page;
  }
}

export const ChatsPage = withStore<ChatsPageProps>((state) => ({
  chats: state.chats,
}))(PureChatsPage);
