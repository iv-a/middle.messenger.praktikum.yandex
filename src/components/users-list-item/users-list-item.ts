import { Block } from '../../core';
import { IChatUser } from '../../types';
import { getActionButtonTitle, getActionButtonVariant } from '../../utils';
import { Avatar } from '../avatar';
import { Button } from '../button';
import rawTemplate from './users-list-item.hbs?raw';
import styles from './users-list-item.module.css';

export interface UsersListItemProps {
  user: IChatUser;
  action: 'add' | 'delete' | 'select' | 'unselect';
  currentUser?: boolean;
  onClick: (id: number) => void;
  [key: string]: unknown;
}

export class UsersListItem extends Block<UsersListItemProps> {
  constructor(props: UsersListItemProps) {
    super('li', {
      ...props,
      id: props.user.id,
      first_name: props.user.first_name,
      second_name: props.user.second_name,
      login: props.user.login,
      Avatar: new Avatar({
        size: 'm',
        avatarUrl: props.user.avatar,
        first_name: props.user.first_name,
        second_name: props.user.second_name,
      }),
      ActionButton: new Button({
        variant: getActionButtonVariant(props.action),
        text: getActionButtonTitle(props.action),
        size: 'm',
        type: 'button',
        block: true,
        events: {
          click: (e: Event) => {
            e.preventDefault();

            props.onClick(props.user.id);
          },
        },
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
    _oldProps: UsersListItemProps,
    _newProps: UsersListItemProps,
  ): boolean {
    this._setClassName();

    return true;
  }

  render(): string {
    return rawTemplate;
  }

  private _setClassName() {
    const classes = [styles.item];

    this.props.className = classes.filter(Boolean).join(' ');
  }
}
