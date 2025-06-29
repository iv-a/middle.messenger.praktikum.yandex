import { Block } from '../../core';
import { withStore } from '../../hocs';
import { IChat } from '../../types';
import { Avatar } from '../avatar';
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
