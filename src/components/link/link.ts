import { Block, Router } from '../../core';
import rawTemplate from './link.hbs?raw';
import styles from './link.module.css';

export interface LinkProps {
  to: string;
  title: string;
  attrs?: Record<string, string>;
  events?: Record<string, EventListener>;
  [key: string]: unknown;
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super('a', {
      ...props,
      attrs: {
        href: props.to,
      },
      events: {
        click: (event: Event) => {
          event.preventDefault();
          Router.getInstance().go(props.to);
        },
      },
    });
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
    this.props.className = styles.link;
  }
}
