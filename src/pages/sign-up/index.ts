import rawTemplate from "./sign-up.hbs?raw";
import signUpForm from "./form.hbs?raw";
import s from "./sign-up.module.css";
import { registerPartials } from "../../utils";

export const SignUp = {
  Component: rawTemplate,
  styles: s,
};

registerPartials({
  "sign-up-form": signUpForm,
});
