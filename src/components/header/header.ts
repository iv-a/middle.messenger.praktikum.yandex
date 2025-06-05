import { Block } from '../../core';
import rawTemplate from './header.hbs?raw';
import styles from './header.module.css';

export interface HeaderProps {
  logoIcon: string;
  title: string;
  subtitle: string;
  [key: string]: unknown;
}

export class Header extends Block<HeaderProps> {
  constructor(props: HeaderProps) {
    super('div', props);
  }

  protected getTemplateContext(): Record<string, unknown> {
    return { styles };
  }

  protected init() {
    this._setClassName();
  }

  protected componentDidUpdate(): boolean {
    this._setClassName();
    return true;
  }

  protected render(): string {
    return rawTemplate;
  }

  private _setClassName() {
    this.props.className = styles.header;
  }
}
