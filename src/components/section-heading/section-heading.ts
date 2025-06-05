import { Block } from '../../core';
import rawTemplate from './section-heading.hbs?raw';
import styles from './section-heading.module.css';

export interface SectionHeadingProps {
  title: string;
  subtitle: string;
  [key: string]: unknown;
}

export class SectionHeading extends Block<SectionHeadingProps> {
  constructor(props: SectionHeadingProps) {
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
    this.props.className = styles.sectionHeading;
  }
}
