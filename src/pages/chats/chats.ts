import { icons } from '../../assets/icons';
import {
  Button,
  Chat,
  ChatItem,
  CreateChatModal,
  Input,
} from '../../components';
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
      chatItems:
        props.chats?.map(
          ({ avatar, id, last_message, title, unread_count }) => {
            return new ChatItem({
              avatarUrl: avatar,
              displayName: title,
              time: last_message?.time || '',
              message: last_message?.content || '',
              unread: unread_count,
            });
          },
        ) || [],
      CreateChatButton: new Button({
        tagName: 'button',
        type: 'button',
        variant: 'primary',
        size: 'xl',
        iconOnly: true,
        icon: icons.plus,
        round: true,
        events: {
          click: (e: Event) => {
            e.preventDefault();

            const createChatModal = this.children
              .CreateChatModal as CreateChatModal;

            if (createChatModal) {
              createChatModal.setProps({ isOpen: true });
            }
          },
        },
      }),
      CreateChatModal: new CreateChatModal(),
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

  protected componentDidUpdate(
    oldProps: ChatsPageProps,
    newProps: ChatsPageProps,
  ): boolean {
    this._setClassName();
    console.log({ oldProps, newProps });

    return true;
  }

  render(): string {
    // console.count();
    console.log(this.props);

    return rawTemplate;
  }

  private _setClassName() {
    this.props.className = styles.page;
  }
}

export const ChatsPage = withStore<ChatsPageProps>((state) => ({
  chats: state.chats,
}))(PureChatsPage);
