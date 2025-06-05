import { Block } from '../../core';
import rawTemplate from './avatar.hbs?raw';
import styles from './avatar.module.css';

export interface AvatarProps {
  avatarUrl: string;
  size: 's' | 'm' | 'l' | 'xl' | 'xxl';
  title?: string;
  attrs?: Record<string, string>;
  events?: Record<string, EventListener>;
  [key: string]: unknown;
}

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super('div', props);
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected init() {
    this._setClassName();
  }

  protected componentDidUpdate(
    oldProps: AvatarProps,
    newProps: AvatarProps,
  ): boolean {
    if (oldProps.size !== newProps.size) {
      this._setClassName();
    }
    return true;
  }

  protected render(): string {
    return rawTemplate;
  }

  private _setClassName() {
    const sizeMap: Record<AvatarProps['size'], string> = {
      s: styles.s,
      m: styles.m,
      l: styles.l,
      xl: styles.xl,
      xxl: styles.xxl,
    };

    const sizeClass = this.props.size ? sizeMap[this.props.size] : '';
    const baseClass = styles.container;
    const extra = this.props.className ?? '';

    const combined = [baseClass, sizeClass, extra].filter(Boolean).join(' ');
    this.props.className = combined;
  }
}
