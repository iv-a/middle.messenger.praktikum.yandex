import { Block } from '../../core';
import { IChat } from '../../types';
import { Avatar } from '../avatar';
import rawTemplate from './chat-item.hbs?raw';
import styles from './chat-item.module.css';

export interface ChatItemProps {
  chat: IChat;
  isActive: boolean;
  [key: string]: unknown;
}

export class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super('li', {
      ...props,
      Avatar: new Avatar({
        size: 'l',
        avatarUrl: props.chat.avatar,
        first_name: props.chat.title,
      }),
      time: props.chat.last_message?.time ?? '',
      message: props.chat.last_message?.content ?? '',
      owner: props.chat.last_message?.user.first_name ?? '',
      unread: props.chat.unread_count ?? 0,
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
    const classes = [styles.card];

    if (this.props.isActive) {
      classes.push(styles.active);
    }
    this.props.className = classes.filter(Boolean).join(' ');
  }
}
