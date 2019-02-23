import { Logger } from "./logging";
import { hasClass } from "./dom";

const logger = new Logger('Observer');

const observerOptions = {
  childList: true,
  subtree: true,
  characterData: true,
};

export class Observer {
  private globalObserver: MutationObserver =
      new MutationObserver((rs) => this.globalMutation(rs));
  private elementObserver: MutationObserver =
      new MutationObserver((rs) => this.elementMutation(rs));
  
  private targetClassName: string = null;
  private element: Element = null;

  private onInitHandler: (Element) => void = null;
  private onChangeHandler: (MutationRecord) => void = null;

  constructor(
    className: string,
    onInitHandler: (Element) => void,
    onChangeHandler: (MutationRecord) => void
  ) {
    this.targetClassName = className;
    this.onInitHandler = onInitHandler;
    this.onChangeHandler = onChangeHandler;

    const elements = document.body.getElementsByClassName(className);
    if (elements.length > 1) {
      this.setElement(elements[0]);
      return;
    }

    this.globalObserver.observe(document.body, observerOptions);
  }

  private setElement(element: Element) {
    if (this.element !== null) {
      logger.error('Element has already been set.');
      return;
    }

    this.element = element;
    this.globalObserver.disconnect();
    this.globalObserver = null;

    this.onInitHandler(element);
    this.elementObserver.observe(this.element, observerOptions);
  }

  private globalMutation(mutations: MutationRecord[]) {
    mutations.some(({ target }) => {
      if (!(target instanceof Element)) {
        return false;
      }

      if (hasClass(target, this.targetClassName)) {
        this.setElement(target);
        return true;
      }

      const element = target.getElementsByClassName(this.targetClassName)[0];
      if (element) {
        this.setElement(element);
        return true;
      }

      return false;
    });
  }

  private elementMutation(mutations: MutationRecord[]) {
    mutations.forEach(this.onChangeHandler);
  }
}
