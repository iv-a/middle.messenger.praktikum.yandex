import { Block } from '../../core';
import { validateField } from '../../utils';
import { Button } from '../button';
import { ButtonProps } from '../button/button';
import { Input } from '../input';
import { InputProps } from '../input/input';
import rawTemplate from './user-information-form.hbs?raw';
import styles from './user-information-form.module.css';

interface UserInformationFormProps {
  formState: {
    login: string;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
  };
  errors: {
    login: string;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
  };
  [key: string]: unknown;
}

export class UserInformationForm extends Block<UserInformationFormProps> {
  constructor(
    props: UserInformationFormProps = {
      formState: {
        login: '',
        first_name: '',
        second_name: '',
        email: '',
        phone: '',
      },
      errors: {
        login: '',
        first_name: '',
        second_name: '',
        email: '',
        phone: '',
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
      SaveButton: new Button({
        variant: 'primary',
        text: 'Save',
        size: 'm',
        type: 'submit',
        events: {
          click: (e: Event) => {
            e.preventDefault();

            const { email, login, first_name, second_name, phone } =
              this.props.formState;
            const emailError = validateField('email', email);
            const loginError = validateField('login', login);
            const firstNameError = validateField('first_name', first_name);
            const secondNameError = validateField('second_name', second_name);
            const phoneError = validateField('phone', phone);

            this.setProps({
              errors: {
                email: emailError,
                login: loginError,
                first_name: firstNameError,
                second_name: secondNameError,
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
            (this.children.PhoneInput as Block<InputProps>).setProps({
              error: phoneError,
            });

            if (
              emailError ||
              loginError ||
              firstNameError ||
              secondNameError ||
              phoneError
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
    _oldProps: UserInformationFormProps,
    _newProps: UserInformationFormProps,
  ): boolean {
    const { email, login, first_name, second_name, phone } = _newProps.errors;
    const hasErrors =
      email.length > 0 ||
      login.length > 0 ||
      first_name.length > 0 ||
      second_name.length > 0 ||
      phone.length > 0;

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
