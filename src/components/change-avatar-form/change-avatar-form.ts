import { Block } from '../../core';
import { Avatar } from '../avatar';
import { Button, ButtonProps } from '../button';
import { Input, InputProps } from '../input';
import { icons } from '../../assets/icons';
import rawTemplate from './change-avatar-form.hbs?raw';
import styles from './change-avatar-form.module.css';
import { User } from '../../types';
import { withStore } from '../../hocs';
import { usersController } from '../../controllers';
import { validateField } from '../../utils';

export interface ChangeAvatarFormProps {
  user: User | null;
  isOpen: boolean;
  formState: {
    avatar: File | null;
  };
  errors: {
    avatar: string;
  };
  [key: string]: unknown;
}

const defaultProps: ChangeAvatarFormProps = {
  isOpen: false,
  user: null,
  formState: { avatar: null },
  errors: { avatar: '' },
};

class PureChangeAvatarForm extends Block<ChangeAvatarFormProps> {
  constructor(props: ChangeAvatarFormProps = defaultProps) {
    super('form', {
      ...props,
      Avatar: new Avatar({
        avatarUrl: props.user?.avatar ?? '',
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
          change: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              const file = target.files?.[0] || null;

              const error = validateField('avatar', file);

              this.setProps({
                formState: {
                  avatar: file,
                },
                errors: { avatar: error },
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

            const { avatar } = this.props.formState;
            const avatarError = validateField('avatar', avatar);
            this.setProps({ errors: { avatar: avatarError } });

            const avatarInput = this.children.AvatarInput as Block<InputProps>;
            if (avatarInput) {
              avatarInput.setProps({ error: avatarError });
            }

            if (avatarError) return;

            if (!this.props.formState.avatar) return;
            const formData = new FormData();
            formData.append('avatar', this.props.formState.avatar);
            usersController.updateUserAvatar(formData);
            this.setProps({ isOpen: false });
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

            this.setProps({ ...defaultProps, user: this.props.user });
          },
        },
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

            this.setProps({ isOpen: true });
          },
        },
      }),
    });
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles, alertIcon: icons.alertIcon };
  }

  protected componentDidUpdate(
    oldProps: ChangeAvatarFormProps,
    newProps: ChangeAvatarFormProps,
  ): boolean {
    const avatar = this.children.Avatar as Avatar;
    if (
      (oldProps.user?.avatar !== newProps.user?.avatar ||
        oldProps.user?.second_name !== newProps.user?.second_name ||
        oldProps.user?.first_name !== newProps.user?.first_name) &&
      avatar
    ) {
      avatar.setProps({
        ...avatar.props,
        avatarUrl: newProps.user?.avatar,
        first_name: newProps.user?.first_name,
        second_name: newProps.user?.second_name,
      });
    }

    const avatarError = newProps.errors.avatar;

    const hasErrors = avatarError.length > 0;

    const saveButton = this.children.SaveButton as Block<ButtonProps>;
    if (saveButton) {
      saveButton.setProps({ disabled: hasErrors });
    }

    return true;
  }

  render(): string {
    return rawTemplate;
  }
}

export const ChangeAvatarForm = withStore<ChangeAvatarFormProps>((state) => ({
  ...defaultProps,
  user: state.user,
}))(PureChangeAvatarForm);
