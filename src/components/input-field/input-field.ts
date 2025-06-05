import { Block } from '../../core';
import styles from './input-field.module.css';

export interface InputFieldProps {
  error?: string;
  events?: Record<string, EventListener>;
  attrs?: Record<string, string>;
  [key: string]: unknown;
}

export class InputField extends Block<InputFieldProps> {
  constructor(props: InputFieldProps) {
    super('input', props);
  }

  protected componentDidUpdate(): boolean {
    this._setClassName();
    return true;
  }

  protected init() {
    this._setClassName();
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected render(): string {
    return '';
  }

  private _setClassName() {
    const classes = [styles.input];
    const { error } = this.props;

    if (error && error.length) {
      classes.push(styles.inputError);
    }
    const combined = classes.filter(Boolean).join(' ');
    this.props.className = combined;
  }
}
