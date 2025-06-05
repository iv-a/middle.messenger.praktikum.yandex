import { icons } from '../../assets/icons';
import { Block } from '../../core';
import { validateField } from '../../utils';
import { Button } from '../button';
import { ButtonProps } from '../button/button';
import { Input } from '../input';
import rawTemplate from './message-form.hbs?raw';
import styles from './message-form.module.css';

interface MessageFormProps {
  formState: {
    message: string;
  };
  errors: {
    message: string;
  };
  [key: string]: unknown;
}

export class MessageForm extends Block<MessageFormProps> {
  constructor(
    props: MessageFormProps = {
      formState: { message: '' },
      errors: { message: '' },
    },
  ) {
    super('form', {
      ...props,
      MessageInput: new Input({
        inputId: 'message',
        name: 'message',
        placeholder: 'Write a message...',
        type: 'text',
        events: {
          blur: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              const error = validateField('message', target.value);
              if (error !== this.props.errors.message) {
                this.setProps({
                  errors: { ...this.props.errors, message: error },
                });
              }
            }
          },
          change: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              this.setProps({
                formState: {
                  ...this.props.formState,
                  message: target.value,
                },
              });
            }
          },
        },
      }),
      SendButton: new Button({
        variant: 'primary',
        text: 'Sign in',
        size: 'm',
        type: 'submit',
        iconOnly: true,
        icon: icons.paperPlaneTilt,
        events: {
          click: (e: Event) => {
            e.preventDefault();

            const { message } = this.props.formState;
            const messageError = validateField('message', message);

            this.setProps({
              errors: { message: messageError },
            });

            if (messageError) {
              return;
            }

            console.log(this.props.formState);
          },
        },
      }),
    });
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected componentDidUpdate(
    _oldProps: MessageFormProps,
    _newProps: MessageFormProps,
  ): boolean {
    const hasErrors = _newProps.errors.message.length > 0;
    (this.children.SendButton as Block<ButtonProps>).setProps({
      ..._newProps,
      disabled: hasErrors,
    });
    this._setClassName();
    return true;
  }

  protected init() {
    this._setClassName();
  }

  protected render(): string {
    return rawTemplate;
  }

  private _setClassName() {
    this.props.className = styles.form;
  }
}
