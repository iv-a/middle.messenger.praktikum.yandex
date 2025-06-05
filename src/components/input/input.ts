import { Block } from '../../core';
import styles from './input.module.css';
import rawTemplate from './input.hbs?raw';
import { InputField } from '../input-field';
import { InputFieldProps } from '../input-field/input-field';

export interface InputProps {
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
  helpText?: string;
  alertIcon?: string;
  attrs?: Record<string, string>;
  events?: Record<string, EventListener>;
  [key: string]: unknown;
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super('div', {
      ...props,
      InputField: new InputField({
        events: props.events,
        error: props.error,
        attrs: {
          placeholder: props.placeholder ?? '',
          id: props.inputId ?? '',
          name: props.name ?? '',
          type: props.type ?? '',
        },
      }),
    });
  }

  protected componentDidUpdate(
    _oldProps: InputProps,
    _newProps: InputProps,
  ): boolean {
    (this.children.InputField as Block<InputFieldProps>).setProps(_newProps);
    return true;
  }

  protected init() {
    this._setClassName();
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
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
