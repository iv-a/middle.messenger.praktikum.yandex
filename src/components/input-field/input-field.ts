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

  protected componentDidUpdate(
    _oldProps: InputFieldProps,
    newProps: InputFieldProps,
  ): boolean {
    this._setClassName();

    const el = this.getContent() as HTMLInputElement;
    if (newProps.attrs?.value !== undefined) {
      el.value = String(newProps.attrs.value);
    }
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
    if (this.props.attrs?.type === 'file') {
      classes.push(styles.file);
    }
    const combined = classes.filter(Boolean).join(' ');
    this.props.className = combined;
  }
}
