import { Block } from '../../core';
import { Avatar } from '../avatar';
import rawTemplate from './chat-item.hbs?raw';
import styles from './chat-item.module.css';

export interface ChatItemProps {
  displayName: string;
  time: string;
  message: string;
  unread: number;
  avatarUrl: string;
  [key: string]: unknown;
}

export class ChatItem extends Block<ChatItemProps> {
  constructor(
    props: ChatItemProps = {
      displayName: '',
      time: '',
      message: '',
      unread: 0,
      avatarUrl: '',
    },
  ) {
    super('li', {
      ...props,
      Avatar: new Avatar({
        size: 'l',
        avatarUrl: props.avatarUrl,
      }),
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

  protected render(): string {
    return rawTemplate;
  }

  private _setClassName() {
    this.props.className = styles.card;
  }
}
