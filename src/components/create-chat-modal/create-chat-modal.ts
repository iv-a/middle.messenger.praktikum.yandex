import { chatsController } from '../../controllers';
import { Block } from '../../core';
import { validateField } from '../../utils';
import { Button } from '../button';
import { Input, InputProps } from '../input';
import rawTemplate from './create-chat-modal.hbs?raw';
import styles from './create-chat-modal.module.css';

export interface CreateChatModalProps {
  isOpen: boolean;
  formState: {
    title: string;
  };
  errors: {
    title: string;
  };
  [key: string]: unknown;
}

const defaultProps: CreateChatModalProps = {
  isOpen: false,
  formState: {
    title: '',
  },
  errors: {
    title: '',
  },
};

export class CreateChatModal extends Block<CreateChatModalProps> {
  constructor(props: CreateChatModalProps = defaultProps) {
    super('section', {
      ...props,
      ChatTitleInput: new Input({
        inputId: 'title',
        name: 'title',
        placeholder: 'Enter chat name…',
        label: 'Enter chat name',
        type: 'text',
        value: '',
        helpText:
          'Give your chat a descriptive title so others know what it’s about.',
        events: {
          blur: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              const error = validateField('title', target.value);
              (this.children.ChatTitleInput as Block<InputProps>).setProps({
                error,
              });
              if (error !== this.props.errors.title) {
                this.setProps({
                  errors: { ...this.props.errors, title: error },
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
                  title: target.value,
                },
              });
            }
          },
        },
      }),
      CancelButton: new Button({
        variant: 'outline',
        text: 'Cancel',
        size: 'm',
        type: 'button',
        events: {
          click: (e: Event) => {
            e.preventDefault();

            this.setProps(defaultProps);
          },
        },
      }),
      SubmitButton: new Button({
        variant: 'primary',
        text: 'Create',
        size: 'm',
        type: 'submit',
        events: {
          click: (e: Event) => {
            // console.log(0);

            e.preventDefault();

            // console.log(1);

            const { title } = this.props.formState;
            // console.log(2);
            const titleError = validateField('title', title);
            // console.log(3);
            this.setProps({ errors: { title: titleError } });

            // console.log(4);
            const titleInput = this.children
              .ChatTitleInput as Block<InputProps>;
            // console.log(5);
            if (titleInput) {
              titleInput.setProps({ error: titleError });
            }
            // console.log(6);

            if (titleError) return;
            // console.log(7);

            if (!this.props.formState.title) return;
            // console.log(8);

            chatsController.createChat({ title });
            // console.log(9);

            this.setProps(defaultProps);
            // console.log(10);
          },
        },
      }),
    });
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected init() {
    this._setClassName();
  }

  protected componentDidUpdate(
    _oldProps: CreateChatModalProps,
    newProps: CreateChatModalProps,
  ): boolean {
    this._setClassName();
    const { title } = newProps.errors;
    const hasErrors = title.length > 0;
    const submitButton = this.children.SubmitButton as Button;
    if (submitButton) {
      submitButton.setProps({ disabled: hasErrors });
    }

    const titleInput = this.children.ChatTitleInput as Input;

    if (titleInput) {
      titleInput.setProps({ value: newProps.formState.title, error: title });
    }
    return true;
  }

  render(): string {
    // console.count();

    return rawTemplate;
  }

  private _setClassName() {
    const { isOpen } = this.props;
    const modalClasses: Array<string> = [styles.overlay];
    if (isOpen) {
      modalClasses.push(styles.open);
    }

    this.props.className = modalClasses.filter(Boolean).join(' ');
  }
}
