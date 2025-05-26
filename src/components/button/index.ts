import rawTemplate from "./button.hbs?raw";
import buttonClasses from "./button-classes.hbs?raw";
import buttonContent from "./button-content.hbs?raw";
import s from "./button.module.css";
import { registerPartials } from "../../utils";

export const Button = {
  Component: rawTemplate,
  styles: s,
};

registerPartials({
  "button-classes": buttonClasses,
  "button-content": buttonContent,
});
