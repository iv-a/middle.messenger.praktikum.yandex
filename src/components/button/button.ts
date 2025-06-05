import rawTemplate from './button.hbs?raw';
import rawIconOnlyTemplate from './button-icon-only.hbs?raw';

import styles from './button.module.css';
import { Block } from '../../core';
export interface ButtonProps {
  tagName?: 'button' | 'a';
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 's' | 'm' | 'l';
  loading?: boolean;
  disabled?: boolean;
  iconOnly?: boolean;
  block?: boolean;
  icon?: string;
  prefix?: boolean;
  suffix?: boolean;
  text?: string;
  attrs?: Record<string, string>;
  events?: Record<string, EventListener>;
  onClick?: EventListener;
  [key: string]: unknown;
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    const realTag = props.tagName === 'a' ? 'a' : 'button';
    super(realTag, props);
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }
  protected componentDidUpdate(): boolean {
    // console.log({ _oldProps, _newProps });
    this._recompute();
    return true;
  }

  protected init() {
    this._recompute();
  }

  private _recompute() {
    this._setClassName();
  }

  private _setClassName() {
    const { variant, size, loading, disabled, iconOnly, block } = this.props;

    const buttonClasses: string[] = [styles.button];

    const variantMap: Record<NonNullable<ButtonProps['variant']>, string> = {
      primary: styles.primary,
      secondary: styles.secondary,
      outline: styles.outline,
      destructive: styles.destructive,
    };
    if (variant && variantMap[variant]) {
      buttonClasses.push(variantMap[variant]);
    }

    const sizeMap: Record<NonNullable<ButtonProps['size']>, string> = {
      s: styles.s,
      m: styles.m,
      l: styles.l,
    };
    if (size && sizeMap[size]) {
      buttonClasses.push(sizeMap[size]);
    }

    if (loading) {
      buttonClasses.push(styles.loading);
    }
    if (disabled) {
      buttonClasses.push(styles.disabled);
    }
    if (iconOnly) {
      buttonClasses.push(styles.iconOnly);
    }
    if (block) {
      buttonClasses.push(styles.block);
    }

    this.props.className = buttonClasses.join(' ');
  }

  protected render(): string {
    if (this.props.iconOnly) {
      return rawIconOnlyTemplate;
    } else {
      return rawTemplate;
    }
  }
}
