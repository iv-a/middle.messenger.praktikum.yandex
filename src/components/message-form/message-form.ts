import { icons } from '../../assets/icons';
import { messagesController } from '../../controllers';
import { Block } from '../../core';
import { validateField } from '../../utils';
import { Button } from '../button';
import { ButtonProps } from '../button/button';
import { Input } from '../input';
import rawTemplate from './message-form.hbs?raw';
import styles from './message-form.module.css';

export interface MessageFormProps {
  formState: {
    message: string;
  };
  errors: {
    message: string;
  };
  [key: string]: unknown;
}

const defaultProps: MessageFormProps = {
  formState: { message: '' },
  errors: { message: '' },
};

export class MessageForm extends Block<MessageFormProps> {
  constructor(props: MessageFormProps = defaultProps) {
    super('form', {
      ...props,
      events: {
        submit: (e: Event) => {
          e.preventDefault();

          const { message } = this.props.formState;
          const messageError = validateField('message', message);

          this.setProps({
            errors: { message: messageError },
          });

          if (messageError) {
            return;
          }

          messagesController.sendMessage(this.props.formState.message);
          this.setProps(defaultProps);

          const messageInput = this.children.MessageInput as Input;

          if (messageInput) {
            messageInput.setProps({
              value: '',
              error: '',
            });
          }
        },
      },
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
                  errors: { message: error },
                });
              }
            }
          },
          change: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              this.setProps({
                formState: {
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
      }),
    });
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected componentDidUpdate(
    _oldProps: MessageFormProps,
    newProps: MessageFormProps,
  ): boolean {
    const hasErrors = newProps.errors.message.length > 0;
    (this.children.SendButton as Block<ButtonProps>).setProps({
      ...newProps,
      disabled: hasErrors,
    });

    (this.children.MessageInput as Input).setProps({
      value: newProps.formState.message,
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
