import { icons } from '../../assets/icons';
import {
  Button,
  Chat,
  ChatItem,
  ChatsList,
  CreateChatModal,
  Input,
} from '../../components';
import { authController, chatsController } from '../../controllers';
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
      ChatsList: new ChatsList(),
    });
    chatsController.getChats({ limit: 50, offset: 0 });
    authController.getMe();
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected init() {
    this._setClassName();
  }

  protected componentDidUpdate(
    _oldProps: ChatsPageProps,
    _newProps: ChatsPageProps,
  ): boolean {
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
