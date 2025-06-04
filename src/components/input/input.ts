import { Block } from '../../core';
import styles from './input.module.css';
import rawTemplate from './input.hbs?raw';

interface InputProps {
  label?: string;
  inputId?: string;
  name?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  attributes?: Record<string, string>;
  helpText?: string;
  alertIcon?: string;
  className?: string;
  [key: string]: unknown;
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super('div', props);
  }

  protected init() {
    this._setClassName();
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected componentDidUpdate(
    oldProps: InputProps,
    newProps: InputProps,
  ): boolean {
    return oldProps.value !== newProps.value;
  }

  protected render(): string {
    return rawTemplate;
  }

  private _setClassName() {
    const extra = this.props.className ?? '';
    const combined = [styles.inputGroup, extra].filter(Boolean).join(' ');
    this.props.className = combined;
  }
}
