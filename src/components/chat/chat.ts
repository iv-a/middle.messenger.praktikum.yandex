import { icons } from '../../assets/icons';
import { Block } from '../../core';
import { withStore } from '../../hocs';
import { IChat } from '../../types';
import { AddUsersModal, PureAddUsersModal } from '../add-users-modal';
import { Avatar } from '../avatar';
import { Button } from '../button';
import { MessageForm } from '../message-form';
import rawTemplate from './chat.hbs?raw';
import styles from './chat.module.css';

export interface ChatProps {
  activeChat: IChat | null;
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
      }),
      DeleteChatButton: new Button({
        tagName: 'button',
        type: 'button',
        variant: 'dropdown',
        size: 'l',
        text: 'Delete chat',
        block: true,
        prefix: true,
        icon: icons.trash,
      }),
      AddUsersModal: new AddUsersModal(),
    });
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected init() {
    this._setClassName();
  }

  protected componentDidUpdate(
    _oldProps: ChatProps,
    newProps: ChatProps,
  ): boolean {
    const avatar = this.children.Avatar as Avatar;
    if (avatar) {
      avatar.setProps({
        avatarUrl: newProps.activeChat?.avatar,
        first_name: newProps.activeChat?.title,
      });
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
  activeChat: state.activeChat,
}))(PureChat);
