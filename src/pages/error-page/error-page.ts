import { icons } from '../../assets/icons';
import { Button } from '../../components';
import { Block } from '../../core';
import rawTemplate from './error-page.hbs?raw';
import styles from './error-page.module.css';

export interface ErrorPageProps {
  code: string | number;
  description: string;
  [key: string]: unknown;
}

export class ErrorPage extends Block<ErrorPageProps> {
  constructor(
    props: ErrorPageProps = {
      code: '500',
      description: 'Something went wrong',
    },
  ) {
    super('main', {
      ...props,
      BackButton: new Button({
        tagName: 'a',
        attrs: {
          href: '#/',
        },
        variant: 'primary',
        size: 'l',
        block: true,
        iconOnly: true,
        icon: icons.caretLeftIcon,
      }),
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
    this.props.className = styles.page;
  }
}
