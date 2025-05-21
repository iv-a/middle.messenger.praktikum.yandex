import Handlebars from "handlebars";
import { PartialComponent } from "../types";

export const registerHelpers = (helpers: Record<string, any>) => {
    Object.entries(helpers).forEach(([name, helper]) => {
        Handlebars.registerHelper(name, helper);
    });
};

export const registerPartials = (partials: Record<string, PartialComponent>) => {
    Object.entries(partials).forEach(([name, {Component}]) => {
        Handlebars.registerPartial(name, Component);
    });
};