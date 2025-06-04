import rawTemplate from './sign-in.hbs?raw';
import signInForm from './form.hbs?raw';
import s from './sign-in.module.css';
import { registerPartials } from '../../utils';

export const SignIn = {
  Component: rawTemplate,
  styles: s,
};

registerPartials({
  'sign-in-form': signInForm,
});
