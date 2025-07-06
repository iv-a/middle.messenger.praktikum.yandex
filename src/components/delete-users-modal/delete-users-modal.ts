import { chatsController } from '../../controllers';
import { Block, store } from '../../core';
import { withStore } from '../../hocs';
import { IChat, IChatUser, User } from '../../types';
import { Button } from '../button';
import { UsersListItem } from '../users-list-item';
import rawTemplate from './delete-users-modal.hbs?raw';
import styles from './delete-users-modal.module.css';

export interface DeleteUsersModalProps {
  isOpen: boolean;
  user: User | null;
  activeChat: IChat | null;
  activeChatUsers: Array<IChatUser>;
  notFound: boolean;
  [key: string]: unknown;
}

const defaultProps: DeleteUsersModalProps = {
  isOpen: false,
  user: null,
  activeChat: store.get().activeChat,
  activeChatUsers: [],
  notFound: false,
};

export class PureDeleteUsersModal extends Block<DeleteUsersModalProps> {
  constructor(props: DeleteUsersModalProps) {
    super('section', {
      ...props,
      CancelButton: new Button({
        variant: 'outline',
        text: 'Cancel',
        size: 'm',
        type: 'button',
        events: {
          click: (e: Event) => {
            e.preventDefault();

            this.setProps({ isOpen: false });
          },
        },
      }),
      notFound: false,
    });
    if (props.activeChat?.id) {
      chatsController
        .getChatUsers({ id: props.activeChat.id })
        .then((res) => this.setProps({ activeChatUsers: res }));
    }
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected init() {
    this._setClassName();
  }

  protected componentDidUpdate(
    oldProps: DeleteUsersModalProps,
    newProps: DeleteUsersModalProps,
  ): boolean {
    this._setClassName();

    if (oldProps.activeChat?.id !== newProps.activeChat?.id) {
      if (newProps.activeChat?.id) {
        chatsController
          .getChatUsers({ id: newProps.activeChat.id })
          .then((res) =>
            this.setProps({
              activeChatUsers: res,
            }),
          );
      }
    }

    if (oldProps.activeChatUsers !== newProps.activeChatUsers) {
      this.children.ChatUsers =
        newProps.activeChatUsers.map(
          ({ id, login, avatar, first_name, second_name, display_name }) => {
            const user = {
              id,
              avatar,
              display_name,
              first_name,
              second_name,
              login,
            };

            return new UsersListItem({
              action: 'delete',
              currentUser: id === newProps.user?.id,
              onClick: () => {
                const chatId = newProps.activeChat?.id;

                if (chatId) {
                  chatsController
                    .deleteUsersFromChat({
                      chatId,
                      users: [id],
                    })
                    .then(() => {
                      chatsController
                        .getChatUsers({ id: chatId })
                        .then((res) => this.setProps({ activeChatUsers: res }));
                    });
                }
              },
              user,
            });
          },
        ) || [];
    }

    return true;
  }

  render(): string {
    return rawTemplate;
  }

  private _setClassName() {
    const { isOpen } = this.props;
    const modalClasses: Array<string> = [styles.overlay];
    if (isOpen) {
      modalClasses.push(styles.open);
    }

    this.props.className = modalClasses.filter(Boolean).join(' ');
  }
}

export const DeleteUsersModal = withStore<DeleteUsersModalProps>((state) => ({
  ...defaultProps,
  activeChat: state.activeChat,
  user: state.user,
}))(PureDeleteUsersModal);
