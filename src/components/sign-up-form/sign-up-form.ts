import { Block } from '../../core';
import { validateField } from '../../utils';
import { Button } from '../button';
import { ButtonProps } from '../button/button';
import { Input } from '../input';
import { InputProps } from '../input/input';
import rawTemplate from './sign-up-form.hbs?raw';
import styles from './sign-up-form.module.css';

interface SignUpFormProps {
  formState: {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    password: string;
    confirm_password: string;
  };
  errors: {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    password: string;
    confirm_password: string;
  };
  [key: string]: unknown;
}

export class SignUpForm extends Block<SignUpFormProps> {
  constructor(
    props: SignUpFormProps = {
      formState: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        confirm_password: '',
      },
      errors: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        confirm_password: '',
      },
    },
  ) {
    super('form', {
      ...props,
      EmailInput: new Input({
        inputId: 'email',
        name: 'email',
        placeholder: 'Email',
        label: 'Email',
        type: 'email',
        value: '',
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
        value: '',
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
        value: '',
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
        value: '',
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
      PhoneInput: new Input({
        inputId: 'phone',
        name: 'phone',
        placeholder: 'Phone number',
        label: 'Phone number',
        type: 'tel',
        value: '',
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
      PasswordInput: new Input({
        inputId: 'password',
        name: 'password',
        placeholder: 'Password',
        label: 'Password',
        type: 'password',
        value: '',
        helpText:
          '8–40 characters, must include at least one uppercase letter and one digit.',
        events: {
          blur: (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
              const error = validateField('password', target.value);
              (this.children.PasswordInput as Block<InputProps>).setProps({
                error,
              });
              if (error !== this.props.errors.password) {
                this.setProps({
                  errors: { ...this.props.errors, password: error },
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
                  password: target.value,
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
      SignUpButton: new Button({
        variant: 'primary',
        text: 'Sign up',
        size: 'l',
        block: true,
        type: 'submit',
        events: {
          click: (e: Event) => {
            e.preventDefault();

            const {
              email,
              login,
              first_name,
              second_name,
              phone,
              password,
              confirm_password,
            } = this.props.formState;
            const emailError = validateField('email', email);
            const loginError = validateField('login', login);
            const firstNameError = validateField('first_name', first_name);
            const secondNameError = validateField('second_name', second_name);
            const phoneError = validateField('phone', phone);
            const passwordError = validateField('password', password);
            const confirmPasswordError = validateField(
              'confirm_password',
              confirm_password,
              {
                password,
              },
            );

            this.setProps({
              errors: {
                email: emailError,
                login: loginError,
                first_name: firstNameError,
                second_name: secondNameError,
                phone: phoneError,
                password: passwordError,
                confirm_password: confirmPasswordError,
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
            (this.children.PhoneInput as Block<InputProps>).setProps({
              error: phoneError,
            });
            (this.children.PasswordInput as Block<InputProps>).setProps({
              error: passwordError,
            });
            (this.children.ConfirmPasswordInput as Block<InputProps>).setProps({
              error: confirmPasswordError,
            });

            if (
              emailError ||
              loginError ||
              firstNameError ||
              secondNameError ||
              phoneError ||
              passwordError ||
              confirmPasswordError
            ) {
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
    _oldProps: SignUpFormProps,
    _newProps: SignUpFormProps,
  ): boolean {
    const {
      email,
      login,
      first_name,
      second_name,
      phone,
      password,
      confirm_password,
    } = _newProps.errors;
    const hasErrors =
      email.length > 0 ||
      login.length > 0 ||
      first_name.length > 0 ||
      second_name.length > 0 ||
      phone.length > 0 ||
      password.length > 0 ||
      confirm_password.length > 0;
    (this.children.SignUpButton as Block<ButtonProps>).setProps({
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
