import { Block } from '../../core';
import { Button } from '../button';
import { Input } from '../input';
import rawTemplate from './sign-in-form.hbs?raw';
import styles from './sign-in-form.module.css';
import { validateField } from '../../utils';
import { ButtonProps } from '../button/button';
import { InputProps } from '../input/input';

interface SignInFormProps {
  formState: {
    login: string;
    password: string;
  };
  errors: {
    login: string;
    password: string;
  };
  [key: string]: unknown;
}

export class SignInForm extends Block<SignInFormProps> {
  constructor(
    props: SignInFormProps = {
      formState: { login: '', password: '' },
      errors: { login: '', password: '' },
    },
  ) {
    super('div', {
      ...props,
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
      SignInButton: new Button({
        variant: 'primary',
        text: 'Sign in',
        size: 'l',
        block: true,
        type: 'submit',
        events: {
          click: (e: Event) => {
            e.preventDefault();

            const { login, password } = this.props.formState;
            const loginError = validateField('login', login);
            const passwordError = validateField('password', password);

            this.setProps({
              errors: { login: loginError, password: passwordError },
            });

            (this.children.LoginInput as Block<InputProps>).setProps({
              error: loginError,
            });
            (this.children.PasswordInput as Block<InputProps>).setProps({
              error: passwordError,
            });

            if (loginError || passwordError) {
              return;
            }

            console.log(this.props.formState);
          },
        },
      }),
    });
  }

  protected componentDidUpdate(
    _oldProps: SignInFormProps,
    _newProps: SignInFormProps,
  ): boolean {
    const hasErrors =
      _newProps.errors.login.length > 0 || _newProps.errors.password.length > 0;
    (this.children.SignInButton as Block<ButtonProps>).setProps({
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
