import { Block } from '../../core';
import { IChatUser } from '../../types';
import { Avatar } from '../avatar';
import rawTemplate from './message-item.hbs?raw';
import styles from './message-item.module.css';

export interface MessageItemProps {
  isSelf: boolean;
  message: string;
  time: string;
  displayName: string;
  user?: IChatUser & { role: string };
  [key: string]: unknown;
}

export class MessageItem extends Block<MessageItemProps> {
  constructor(props: MessageItemProps) {
    super('li', {
      ...props,
      Avatar: new Avatar({
        size: 'l',
        avatarUrl: props.user?.avatar || null,
        first_name: props.user?.first_name,
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
    const classes = [styles.message];
    if (this.props.isSelf) {
      classes.push(styles.self);
    }
    const combined = classes.filter(Boolean).join(' ');
    this.props.className = combined;
  }
}
