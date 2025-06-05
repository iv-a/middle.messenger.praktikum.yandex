import { Block } from '../../core';
import { validateField } from '../../utils';
import { Button } from '../button';
import { ButtonProps } from '../button/button';
import { Input } from '../input';
import { InputProps } from '../input/input';
import rawTemplate from './change-password-form.hbs?raw';
import styles from './change-password-form.module.css';

interface ChangePasswordFormProps {
  formState: {
    oldPassword: string;
    newPassword: string;
    confirm_password: string;
  };
  errors: {
    oldPassword: string;
    newPassword: string;
    confirm_password: string;
  };
  [key: string]: unknown;
}

export class ChangePasswordForm extends Block<ChangePasswordFormProps> {
  constructor(
    props: ChangePasswordFormProps = {
      formState: {
        oldPassword: '',
        newPassword: '',
        confirm_password: '',
      },
      errors: {
        oldPassword: '',
        newPassword: '',
        confirm_password: '',
      },
    },
  ) {
    super('form', {
      ...props,
      OldPasswordInput: new Input({
        inputId: 'oldPassword',
        name: 'oldPassword',
        placeholder: 'Password',
        label: 'Verify current password',
        type: 'password',
        value: '',
        helpText: 'Use your current password.',
        events: {
          blur: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              const error = validateField('password', target.value);
              (this.children.OldPasswordInput as Block<InputProps>).setProps({
                error,
              });
              if (error !== this.props.errors.oldPassword) {
                this.setProps({
                  errors: { ...this.props.errors, oldPassword: error },
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
                  oldPassword: target.value,
                },
              });
            }
          },
        },
      }),
      NewPasswordInput: new Input({
        inputId: 'newPassword',
        name: 'newPassword',
        placeholder: 'Password',
        label: 'New password',
        type: 'password',
        value: '',
        helpText:
          '8–40 characters, must include at least one uppercase letter and one digit.',
        events: {
          blur: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              const error = validateField('password', target.value);
              (this.children.NewPasswordInput as Block<InputProps>).setProps({
                error,
              });
              if (error !== this.props.errors.newPassword) {
                this.setProps({
                  errors: { ...this.props.errors, newPassword: error },
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
                  newPassword: target.value,
                },
              });
            }
          },
        },
      }),
      ConfirmPasswordInput: new Input({
        inputId: 'confirm_password',
        name: 'confirm_password',
        placeholder: 'Confirm Password',
        label: 'Confirm Password',
        type: 'password',
        value: '',
        helpText: 'Repeat your password exactly.',
        events: {
          blur: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              const error = validateField('confirm_password', target.value);
              (
                this.children.ConfirmPasswordInput as Block<InputProps>
              ).setProps({
                error,
              });
              if (error !== this.props.errors.confirm_password) {
                this.setProps({
                  errors: { ...this.props.errors, confirm_password: error },
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
                  confirm_password: target.value,
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

            const { oldPassword, newPassword, confirm_password } =
              this.props.formState;
            const oldPasswordError = validateField('password', oldPassword);
            const newPasswordError = validateField('password', newPassword);
            const confirmPasswordError = validateField(
              'confirm_password',
              confirm_password,
              {
                password: newPassword,
              },
            );

            this.setProps({
              errors: {
                oldPassword: oldPasswordError,
                newPassword: newPasswordError,
                confirm_password: confirmPasswordError,
              },
            });

            (this.children.NewPasswordInput as Block<InputProps>).setProps({
              error: newPasswordError,
            });

            (this.children.OldPasswordInput as Block<InputProps>).setProps({
              error: oldPasswordError,
            });

            (this.children.ConfirmPasswordInput as Block<InputProps>).setProps({
              error: confirmPasswordError,
            });

            if (oldPasswordError || newPasswordError || confirmPasswordError) {
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
    _oldProps: ChangePasswordFormProps,
    _newProps: ChangePasswordFormProps,
  ): boolean {
    const { oldPassword, newPassword, confirm_password } = _newProps.errors;
    const hasErrors =
      oldPassword.length > 0 ||
      newPassword.length > 0 ||
      confirm_password.length > 0;
    (this.children.SaveButton as Block<ButtonProps>).setProps({
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
