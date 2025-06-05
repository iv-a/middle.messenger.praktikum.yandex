// import { Avatar } from './avatar';
// import { Button } from './button';
import { Header } from './header';
import { ChatItem } from './chat-item';
import { MessageItem } from './message-item';

export const Components = {
  // Avatar,
  // Button,
  Header,
  // Input,
  ChatItem,
  MessageItem,
};

export const componentsStyles: Record<string, CSSModuleClasses> = {
  // btnStyles: Components.Button.styles,
  // inputStyles: Components.Input.styles,
  headerStyles: Components.Header.styles,
  // avatarStyles: Components.Avatar.styles,
  chatItemStyles: Components.ChatItem.styles,
  messageItemStyles: Components.MessageItem.styles,
};

export * from './button';
export * from './avatar';
export * from './input';
export * from './sign-in-form';
export * from './sign-up-form';
export * from './user-information-form';
export * from './change-password-form';
export * from './change-avatar-form';
export * from './message-form';
