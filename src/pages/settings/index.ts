import rawTemplate from './settings.hbs?raw';
import baseInfoForm from './basic-information-form.hbs?raw';
import changePassForm from './change-password-form.hbs?raw';
import changeAvatarForm from './change-avatar-form.hbs?raw';
import sectionHeading from './section-heading.hbs?raw';
import s from './settings.module.css';
import { registerPartials } from '../../utils';

export const Settings = {
  Component: rawTemplate,
  styles: s,
};

registerPartials({
  'basic-information-form': baseInfoForm,
  'change-password-form': changePassForm,
  'change-avatar-form': changeAvatarForm,
  'section-heading': sectionHeading,
});
