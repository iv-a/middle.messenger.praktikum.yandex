import rawTemplate from './button.hbs?raw';
import rawIconOnlyTemplate from './button-icon-only.hbs?raw';

import styles from './button.module.css';
import { Block } from '../../core';
interface ButtonProps {
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
  [key: string]: unknown;
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    const realTag = props.tagName === 'a' ? 'a' : 'button';
    super(realTag, props);
  }

  protected init() {
    this._recompute();
  }

  // Переопределяем getTemplateContext, чтобы подмешивать CSS Module
  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  // Решаем, когда нужно перерендерить
  protected componentDidUpdate(
    oldProps: ButtonProps,
    newProps: ButtonProps,
  ): boolean {
    return (
      oldProps.block !== newProps.block ||
      oldProps.disabled !== newProps.disabled ||
      oldProps.icon !== newProps.icon ||
      oldProps.iconOnly !== newProps.iconOnly ||
      oldProps.loading !== newProps.loading ||
      oldProps.prefix !== newProps.prefix ||
      oldProps.size !== newProps.size ||
      oldProps.suffix !== newProps.suffix ||
      oldProps.tagName !== newProps.tagName ||
      oldProps.text !== newProps.text ||
      oldProps.variant !== newProps.variant
    );
  }

  private _recompute() {
    this._setClassName();
  }

  private _setClassName() {
    const {
      variant,
      size,
      loading,
      disabled,
      iconOnly,
      block,
      className: extra,
    } = this.props;

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
    if (typeof extra === 'string' && extra.trim() !== '') {
      buttonClasses.push(extra);
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
