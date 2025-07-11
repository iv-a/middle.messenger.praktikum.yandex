import { Block, store } from '../../core';
import { withStore } from '../../hocs';
import { IChat } from '../../types';
import { ChatItem } from '../chat-item';
import rawTemplate from './chats-list.hbs?raw';
import styles from './chats-list.module.css';

export interface ChatsListProps {
  activeChat: IChat | null;
  chats: Array<IChat>;
  [key: string]: unknown;
}

class PureChatsList extends Block<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super('ul', {
      ...props,
      ChatItems: props.chats.map((chat) => {
        return new ChatItem({
          isActive: chat.id === props.activeChat?.id,
          chat,
          events: {
            click: (e: Event) => {
              e.preventDefault();

              store.set('activeChat', chat);
              store.set('activeChatMessages', null);
            },
          },
        });
      }),
    });
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected init() {
    this._setClassName();
  }

  protected componentDidUpdate(
    oldProps: ChatsListProps,
    newProps: ChatsListProps,
  ): boolean {
    if (
      oldProps.chats !== newProps.chats ||
      oldProps.activeChat !== newProps.activeChat
    ) {
      this.children.ChatItems = newProps.chats.map((chat) => {
        return new ChatItem({
          isActive: chat.id === newProps.activeChat?.id,
          chat,
          events: {
            click: (e: Event) => {
              e.preventDefault();

              store.set('activeChat', chat);
            },
          },
        });
      });
    }
    return true;
  }

  render(): string {
    return rawTemplate;
  }

  private _setClassName() {
    this.props.className = styles.list;
  }
}

export const ChatsList = withStore<ChatsListProps>((state) => ({
  activeChat: state.activeChat,
  chats: state.chats,
}))(PureChatsList);
