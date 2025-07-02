import { GetChatUsersResponse } from '../../api';
import { icons } from '../../assets/icons';
import { chatsController, usersController } from '../../controllers';
import { Block, store } from '../../core';
import { withStore } from '../../hocs';
import { IChat, IChatUser } from '../../types';
import { validateField } from '../../utils';
import { Button } from '../button';
import { Input, InputProps } from '../input';
import { UsersListItem } from '../users-list-item';
import rawTemplate from './add-users-modal.hbs?raw';
import styles from './add-users-modal.module.css';

export interface AddUsersModalProps {
  isOpen: boolean;
  formState: {
    find_users: string;
  };
  errors: {
    find_users: string;
  };
  foundUsers: Array<IChatUser>;
  activeChat: IChat | null;
  activeChatUsers: Set<number>;
  selectedUsers: Array<IChatUser>;
  [key: string]: unknown;
}

const defaultProps: AddUsersModalProps = {
  isOpen: false,
  formState: {
    find_users: '',
  },
  errors: {
    find_users: '',
  },
  foundUsers: [],
  activeChat: store.get().activeChat,
  activeChatUsers: new Set(),
  selectedUsers: [],
};

export class PureAddUsersModal extends Block<AddUsersModalProps> {
  constructor(props: AddUsersModalProps) {
    super('section', {
      ...props,
      FindUsersInput: new Input({
        inputId: 'find_users',
        name: 'find_users',
        placeholder: 'Search by login…',
        type: 'text',
        value: '',
        helpText: 'Enter a login to find and add users to this chat.',
        events: {
          blur: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              const error = validateField('find_users', target.value);
              (this.children.FindUsersInput as Block<InputProps>).setProps({
                error,
              });
              if (error !== this.props.errors.find_users) {
                this.setProps({
                  errors: { find_users: error },
                });
              }
            }
          },
          change: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              this.setProps({
                formState: {
                  find_users: target.value,
                },
              });
            }
          },
        },
      }),
      FindUsersButton: new Button({
        variant: 'primary',
        iconOnly: true,
        icon: icons.magnifyingGlass,
        size: 'm',
        type: 'submit',
        events: {
          click: (e: Event) => {
            e.preventDefault();

            const { find_users } = this.props.formState;
            const error = validateField('find_users', find_users);

            this.setProps({
              errors: { find_users: error },
            });

            (this.children.FindUsersInput as Block<InputProps>)?.setProps({
              error,
            });

            if (error) return;

            usersController.findUser({ login: find_users }).then((res) => {
              this.setProps({
                foundUsers: res?.map(
                  ({
                    id,
                    login,
                    avatar,
                    first_name,
                    second_name,
                    display_name,
                  }) => ({
                    id,
                    login,
                    avatar,
                    first_name,
                    second_name,
                    display_name,
                  }),
                ),
              });
              // this.children.FoundUsers =
              //   res?.map(
              //     ({
              //       id,
              //       login,
              //       avatar,
              //       first_name,
              //       second_name,
              //       display_name,
              //     }) => {
              //       const user = {
              //         id,
              //         avatar,
              //         display_name,
              //         first_name,
              //         second_name,
              //         login,
              //       };
              //       return new UsersListItem({
              //         action: 'add',
              //         onClick: () =>
              //           this.setProps({
              //             selectedUsers: [...this.props.selectedUsers, user],
              //           }),
              //         user,
              //       });
              //     },
              //   ) || [];
            });

            // this.setProps(defaultProps);
          },
        },
      }),
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
      SubmitButton: new Button({
        variant: 'primary',
        text: `Add ${props.selectedUsers.length} user(s)`,
        size: 'm',
        type: 'submit',
        disabled: props.selectedUsers.length === 0,
        events: {
          click: (e: Event) => {
            e.preventDefault();
          },
        },
      }),
      Item1: new UsersListItem({
        action: 'add',
        onClick: () => console.log('click'),
        user: {
          id: 1111,
          avatar:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
          display_name: 'Ivan Ivanov',
          first_name: 'Ivan',
          second_name: 'Ivanov',
          login: 'lolkek1337',
        },
      }),
      Item2: new UsersListItem({
        action: 'delete',
        onClick: () => console.log('click'),
        user: {
          id: 1111,
          avatar:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
          display_name: 'Ivan Ivanov',
          first_name: 'Ivan',
          second_name: 'Ivanov',
          login: 'lolkek1337',
        },
      }),
    });
    if (props.activeChat?.id) {
      chatsController
        .getChatUsers({ id: props.activeChat.id })
        .then((res) =>
          this.setProps({ activeChatUsers: new Set(res?.map(({ id }) => id)) }),
        );
    }
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected init() {
    this._setClassName();
  }

  protected componentDidUpdate(
    oldProps: AddUsersModalProps,
    newProps: AddUsersModalProps,
  ): boolean {
    this._setClassName();

    if (oldProps.foundUsers !== newProps.foundUsers) {
      const selectedUsers = newProps.selectedUsers;
      const foundUsers = newProps.foundUsers;
      console.log(selectedUsers);

      this.children.FoundUsers =
        newProps.foundUsers
          ?.filter(({ id }) => !newProps.activeChatUsers.has(id))
          .map(
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
                action: 'add',
                onClick: () => {
                  this.setProps({
                    selectedUsers: [...selectedUsers, user],
                    foundUsers: foundUsers.filter(
                      ({ id: found_id }) => found_id !== id,
                    ),
                  });
                },
                user,
              });
            },
          ) || [];
    }

    if (oldProps.selectedUsers !== newProps.selectedUsers) {
      this.children.SelectedUsers =
        newProps.selectedUsers?.map(
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
              onClick: () =>
                this.setProps({
                  selectedUsers: this.props.selectedUsers.filter(
                    ({ id: selected_id }) => id !== selected_id,
                  ),
                }),
              user,
            });
          },
        ) || [];
      const submitButton = this.children.SubmitButton as Button;
      if (submitButton) {
        submitButton.setProps({
          text: `Add ${newProps.selectedUsers.length} user(s)`,
          disabled: newProps.selectedUsers.length === 0,
        });
      }
    }

    if (oldProps.activeChat?.id !== newProps.activeChat?.id) {
      if (newProps.activeChat?.id) {
        chatsController
          .getChatUsers({ id: newProps.activeChat.id })
          .then((res) =>
            this.setProps({
              activeChatUsers: new Set(res?.map(({ id }) => id)),
            }),
          );
      }
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

export const AddUsersModal = withStore<AddUsersModalProps>((state) => ({
  ...defaultProps,
  activeChat: state.activeChat,
}))(PureAddUsersModal);
