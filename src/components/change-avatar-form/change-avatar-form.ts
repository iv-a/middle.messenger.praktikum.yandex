import { Block } from '../../core';
import { Avatar } from '../avatar';
import { Button } from '../button';
import { Input } from '../input';
import { icons } from '../../assets/icons';
import rawTemplate from './change-avatar-form.hbs?raw';
import styles from './change-avatar-form.module.css';

interface ChangeAvatarFormProps {
  formState: {
    avatar: string;
  };
  errors: {
    avatar: string;
  };
  [key: string]: unknown;
}

export class ChangeAvatarForm extends Block<ChangeAvatarFormProps> {
  constructor(
    props: ChangeAvatarFormProps = {
      formState: { avatar: '' },
      errors: { avatar: '' },
    },
  ) {
    super('form', {
      ...props,
      Avatar: new Avatar({
        avatarUrl:
          'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0',
        size: 'xxl',
      }),
      AvatarInput: new Input({
        inputId: 'avatar',
        name: 'avatar',
        placeholder: 'Enter file',
        label: 'Avatar',
        type: 'file',
        value: '',
        helpText: '',
        events: {
          blur: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              // todo
            }
          },
          change: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              this.setProps({
                formState: {
                  ...this.props.formState,
                  avatar: target.value,
                },
              });
            }
          },
        },
      }),
      SaveButton: new Button({
        variant: 'primary',
        text: 'Save',
        size: 'm',
        type: 'submit',
        events: {
          click: (e: Event) => {
            e.preventDefault();
            console.log(this.props.formState);
          },
        },
      }),
      CancelButton: new Button({
        variant: 'outline',
        text: 'Cancel',
        size: 'm',
        type: 'cancel',
      }),
      EditButton: new Button({
        variant: 'outline',
        text: 'Edit',
        size: 'm',
        type: 'button',
        icon: icons.pencilIcon,
        prefix: true,
        events: {
          click: (e: Event) => {
            e.preventDefault();

            const modal = document.getElementById(
              'uploadAvatarModal',
            ) as HTMLDialogElement;

            modal.showModal();
          },
        },
      }),
    });
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected componentDidUpdate(): boolean {
    return true;
  }

  protected render(): string {
    return rawTemplate;
  }
}
