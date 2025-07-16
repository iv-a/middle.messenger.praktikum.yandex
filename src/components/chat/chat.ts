import { icons } from '../../assets/icons';
import { chatsController, messagesController } from '../../controllers';
import { Block, store } from '../../core';
import { withStore } from '../../hocs';
import type { IChat, IChatUser, ITextMessage, User } from '../../types';
import { AddUsersModal, PureAddUsersModal } from '../add-users-modal';
import { Avatar } from '../avatar';
import { Button } from '../button';
import { DeleteUsersModal, PureDeleteUsersModal } from '../delete-users-modal';
import { MessageForm } from '../message-form';
import { MessageItem } from '../message-item';
import rawTemplate from './chat.hbs?raw';
import styles from './chat.module.css';

export interface ChatProps {
  activeChat: IChat | null;
  activeChatMessages: Array<ITextMessage> | null;
  activeChatUsers: Map<number, IChatUser & { role: string }> | null;
  user: User | null;
  offset: number;
  noMore: boolean;
  [key: string]: unknown;
}

class PureChat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super('section', {
      ...props,
      Avatar: new Avatar({
        avatarUrl: props.activeChat?.avatar || null,
        first_name: props.activeChat?.title,
        size: 's',
      }),
      GetMoreButton: new Button({
        tagName: 'button',
        type: 'button',
        variant: 'outline',
        size: 'm',
        text: 'Load more',
        events: {
          click: (e: Event) => {
            e.preventDefault();

            const offset = this.props.offset;
            const newOffset = offset + 20;
            messagesController.getMessages(newOffset);
            this.setProps({ offset: newOffset });
          },
        },
      }),
      MessageForm: new MessageForm(),
      OptionsButton: new Button({
        tagName: 'button',
        type: 'button',
        variant: 'outline',
        size: 'm',
        iconOnly: true,
        icon: icons.dotsThreeIcon,
      }),
      AddUsersModalButton: new Button({
        tagName: 'button',
        type: 'button',
        variant: 'dropdown',
        size: 'l',
        text: 'Add users',
        block: true,
        prefix: true,
        icon: icons.userPlus,
        events: {
          click: (e: Event) => {
            e.preventDefault();

            const addUsersModal = this.children
              .AddUsersModal as PureAddUsersModal;
            if (addUsersModal) {
              addUsersModal.setProps({ isOpen: true });
            }
          },
        },
      }),
      DeleteUsersModalButton: new Button({
        tagName: 'button',
        type: 'button',
        variant: 'dropdown',
        size: 'l',
        text: 'Delete users',
        block: true,
        prefix: true,
        icon: icons.userMinus,
        events: {
          click: (e: Event) => {
            e.preventDefault();

            const deleteUsersModal = this.children
              .DeleteUsersModal as PureDeleteUsersModal;
            if (deleteUsersModal) {
              deleteUsersModal.setProps({ isOpen: true });
            }
          },
        },
      }),
      AddUsersModal: new AddUsersModal(),
      DeleteUsersModal: new DeleteUsersModal(),
    });
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected init() {
    this._setClassName();
  }

  protected componentDidUpdate(
    oldProps: ChatProps,
    newProps: ChatProps,
  ): boolean {
    const avatar = this.children.Avatar as Avatar;
    if (avatar) {
      avatar.setProps({
        avatarUrl: newProps.activeChat?.avatar,
        first_name: newProps.activeChat?.title,
      });
    }
    if (oldProps.activeChat !== newProps.activeChat) {
      const chatId = newProps.activeChat?.id;
      if (chatId) {
        chatsController.getChatUsers({ id: chatId }).then((res) => {
          const users = new Map();
          res.forEach((user) => {
            const { id } = user;
            users.set(id, user);
          });
          store.set('activeChatUsers', users);
        });
      }
    }

    if (oldProps.activeChat !== newProps.activeChat) {
      const chatId = newProps.activeChat?.id;
      const userId = newProps.user?.id;
      store.set('activeChatMessages', null);
      if (userId && chatId) {
        messagesController.createWSConnection(userId, chatId).then(() => {
          messagesController.getMessages(0);
        });
      }
    }

    if (
      oldProps.activeChatMessages !== newProps.activeChatMessages &&
      newProps.activeChatMessages
    ) {
      this.children.Messages = newProps.activeChatMessages.map(
        ({ time, user_id, content }) => {
          const user = newProps.activeChatUsers?.get(user_id);

          let name = String(user_id);
          if (user) {
            name = `${user.first_name} ${user.second_name}`;
          }
          return new MessageItem({
            displayName: name,
            time,
            message: content,
            isSelf: user_id === newProps.user?.id,
            user,
          });
        },
      );
    }

    return true;
  }

  render(): string {
    return rawTemplate;
  }

  private _setClassName() {
    this.props.className = styles.chat;
  }
}

export const Chat = withStore<ChatProps>((state) => ({
  activeChatUsers: state.activeChatUsers,
  activeChat: state.activeChat,
  activeChatMessages: state.activeChatMessages,
  user: state.user,
  noMore: state.noMore,
  offset: 0,
}))(PureChat);
