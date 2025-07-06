import { usersController } from '../../controllers';
import { Block } from '../../core';
import { withStore } from '../../hocs';
import { User } from '../../types';
import { validateField } from '../../utils';
import { Button } from '../button';
import { ButtonProps } from '../button/button';
import { Input } from '../input';
import { InputProps } from '../input/input';
import rawTemplate from './user-information-form.hbs?raw';
import styles from './user-information-form.module.css';

export interface UserInformationFormProps {
  user: User | null;
  formState: {
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    email: string;
    phone: string;
  };
  errors: {
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    email: string;
    phone: string;
  };
  [key: string]: unknown;
}

const defaultProps: UserInformationFormProps = {
  user: null,
  formState: {
    login: '',
    first_name: '',
    second_name: '',
    display_name: '',
    email: '',
    phone: '',
  },
  errors: {
    login: '',
    first_name: '',
    second_name: '',
    display_name: '',
    email: '',
    phone: '',
  },
};

class PureUserInformationForm extends Block<UserInformationFormProps> {
  constructor(props: UserInformationFormProps = defaultProps) {
    super('form', {
      ...props,
      EmailInput: new Input({
        inputId: 'email',
        name: 'email',
        placeholder: 'Email',
        label: 'Email',
        type: 'email',
        value: props.formState.email,
        helpText: 'Enter a valid email you have access to.',
        events: {
          blur: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              const error = validateField('email', target.value);
              (this.children.EmailInput as Block<InputProps>).setProps({
                error,
              });
              if (error !== this.props.errors.email) {
                this.setProps({
                  errors: { ...this.props.errors, email: error },
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
                  email: target.value,
                },
              });
            }
          },
        },
      }),
      LoginInput: new Input({
        inputId: 'login',
        name: 'login',
        placeholder: 'Login',
        label: 'Login',
        type: 'text',
        value: props.formState.login,
        helpText:
          '3–20 characters, Latin letters and digits, no spaces, allowed: "-" and "_", must not be digits only.',
        events: {
          blur: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              const error = validateField('login', target.value);
              (this.children.LoginInput as Block<InputProps>).setProps({
                error,
              });
              if (error !== this.props.errors.login) {
                this.setProps({
                  errors: { ...this.props.errors, login: error },
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
                  login: target.value,
                },
              });
            }
          },
        },
      }),
      FirstNameInput: new Input({
        inputId: 'first_name',
        name: 'first_name',
        placeholder: 'First Name',
        label: 'First Name',
        type: 'text',
        value: props.formState.first_name,
        helpText: 'Use your real first name.',
        events: {
          blur: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              const error = validateField('first_name', target.value);
              (this.children.FirstNameInput as Block<InputProps>).setProps({
                error,
              });
              if (error !== this.props.errors.first_name) {
                this.setProps({
                  errors: { ...this.props.errors, first_name: error },
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
                  first_name: target.value,
                },
              });
            }
          },
        },
      }),
      SecondNameInput: new Input({
        inputId: 'second_name',
        name: 'second_name',
        placeholder: 'Second Name',
        label: 'Second Name',
        type: 'text',
        value: props.formState.second_name,
        helpText: 'Use your real last name.',
        events: {
          blur: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              const error = validateField('second_name', target.value);
              (this.children.SecondNameInput as Block<InputProps>).setProps({
                error,
              });
              if (error !== this.props.errors.second_name) {
                this.setProps({
                  errors: { ...this.props.errors, second_name: error },
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
                  second_name: target.value,
                },
              });
            }
          },
        },
      }),
      DisplayNameInput: new Input({
        inputId: 'display_name',
        name: 'display_name',
        placeholder: 'Display Name',
        label: 'Display Name',
        type: 'text',
        value: props.formState.display_name,
        helpText: 'This name will be visible to other users in chats.',
        events: {
          blur: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              const error = validateField('display_name', target.value);
              (this.children.DisplayNameInput as Block<InputProps>).setProps({
                error,
              });
              if (error !== this.props.errors.display_name) {
                this.setProps({
                  errors: { ...this.props.errors, display_name: error },
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
                  display_name: target.value,
                },
              });
            }
          },
        },
      }),
      PhoneInput: new Input({
        inputId: 'phone',
        name: 'phone',
        placeholder: 'Phone number',
        label: 'Phone number',
        type: 'tel',
        value: props.formState.phone,
        helpText: 'Include country code (e.g. +7).',
        events: {
          blur: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              const error = validateField('phone', target.value);
              (this.children.PhoneInput as Block<InputProps>).setProps({
                error,
              });
              if (error !== this.props.errors.phone) {
                this.setProps({
                  errors: { ...this.props.errors, phone: error },
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
                  phone: target.value,
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

            const {
              email,
              login,
              first_name,
              second_name,
              display_name,
              phone,
            } = this.props.formState;
            const emailError = validateField('email', email);
            const loginError = validateField('login', login);
            const firstNameError = validateField('first_name', first_name);
            const secondNameError = validateField('second_name', second_name);
            const displayNameError = validateField(
              'display_name',
              display_name,
            );
            const phoneError = validateField('phone', phone);

            this.setProps({
              errors: {
                email: emailError,
                login: loginError,
                first_name: firstNameError,
                second_name: secondNameError,
                display_name: displayNameError,
                phone: phoneError,
              },
            });

            (this.children.EmailInput as Block<InputProps>).setProps({
              error: emailError,
            });
            (this.children.LoginInput as Block<InputProps>).setProps({
              error: loginError,
            });
            (this.children.FirstNameInput as Block<InputProps>).setProps({
              error: firstNameError,
            });
            (this.children.SecondNameInput as Block<InputProps>).setProps({
              error: secondNameError,
            });
            (this.children.DisplayNameInput as Block<InputProps>).setProps({
              error: displayNameError,
            });
            (this.children.PhoneInput as Block<InputProps>).setProps({
              error: phoneError,
            });

            if (
              emailError ||
              loginError ||
              firstNameError ||
              secondNameError ||
              displayNameError ||
              phoneError
            ) {
              return;
            }

            usersController.updateUserInfo(this.props.formState);
          },
        },
      }),
    });
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected componentDidUpdate(
    oldProps: UserInformationFormProps,
    newProps: UserInformationFormProps,
  ): boolean {
    const { email, login, first_name, second_name, display_name, phone } =
      newProps.errors;
    const hasErrors =
      email.length > 0 ||
      login.length > 0 ||
      first_name.length > 0 ||
      second_name.length > 0 ||
      display_name.length > 0 ||
      phone.length > 0;

    (this.children.SaveButton as Block<ButtonProps>).setProps({
      ...newProps,
      disabled: hasErrors || this.isInitial(),
    });
    this._setClassName();

    const emailInput = this.children.EmailInput as Input;
    const loginInput = this.children.LoginInput as Input;
    const firstNameInput = this.children.FirstNameInput as Input;
    const secondNameInput = this.children.SecondNameInput as Input;
    const displayNameInput = this.children.DisplayNameInput as Input;
    const phoneInput = this.children.PhoneInput as Input;

    if (oldProps.formState.email !== newProps.formState.email && emailInput) {
      emailInput.setProps({ value: newProps.formState.email });
    }
    if (oldProps.formState.login !== newProps.formState.login && loginInput) {
      loginInput.setProps({ value: newProps.formState.login });
    }
    if (
      oldProps.formState.first_name !== newProps.formState.first_name &&
      firstNameInput
    ) {
      firstNameInput.setProps({ value: newProps.formState.first_name });
    }
    if (
      oldProps.formState.second_name !== newProps.formState.second_name &&
      secondNameInput
    ) {
      secondNameInput.setProps({ value: newProps.formState.second_name });
    }
    if (
      oldProps.formState.display_name !== newProps.formState.display_name &&
      displayNameInput
    ) {
      displayNameInput.setProps({ value: newProps.formState.display_name });
    }
    if (oldProps.formState.phone !== newProps.formState.phone && phoneInput) {
      phoneInput.setProps({ value: newProps.formState.phone });
    }

    return true;
  }

  protected init() {
    this._setClassName();
  }

  public render(): string {
    console.log(this);

    return rawTemplate;
  }

  private _setClassName() {
    this.props.className = styles.form;
  }

  protected isInitial() {
    return (
      this.props.formState.email === this.props.user?.email &&
      this.props.formState.login === this.props.user?.login &&
      this.props.formState.first_name === this.props.user?.first_name &&
      this.props.formState.second_name === this.props.user?.second_name &&
      (this.props.formState.display_name === this.props.user?.display_name ||
        this.props.formState.display_name === '') &&
      this.props.formState.phone === this.props.user?.phone
    );
  }
}

export const UserInformationForm = withStore<UserInformationFormProps>(
  (state) => ({
    ...defaultProps,
    formState: {
      login: state.user?.login ?? '',
      first_name: state.user?.first_name ?? '',
      second_name: state.user?.second_name ?? '',
      display_name: state.user?.display_name ?? '',
      email: state.user?.email ?? '',
      phone: state.user?.phone ?? '',
    },
    user: state.user,
  }),
)(PureUserInformationForm);
