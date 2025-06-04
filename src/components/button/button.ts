import rawTemplate from './button.hbs?raw';
import classesPart from './button-classes.hbs?raw';
import contentPart from './button-content.hbs?raw';

import styles from './button.module.css';
import { Block } from '../../core';
import { registerPartials } from '../../utils';

registerPartials({
  'button-classes': classesPart,
  'button-content': contentPart,
});

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
    super('div', props);
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

  // Метод render компилирует наш главный шаблон rawTemplate
  protected render(): string {
    return rawTemplate;
  }
}
