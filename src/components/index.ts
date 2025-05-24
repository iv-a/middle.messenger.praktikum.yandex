import { Avatar } from './avatar';
import { Button } from './button';
import { Header } from './header';
import { Input } from './input';

export const Components = {
  Avatar,
  Button,
  Header,
  Input,
};

export const componentsStyles: Record<string, CSSModuleClasses> = {
  btnStyles: Components.Button.styles,
  inputStyles: Components.Input.styles,
  headerStyles: Components.Header.styles,
  avatarStyles: Components.Avatar.styles,
};
