import jss from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset())

export interface ClassMap { [className: string]: string; }

export function createAndAttach(styles: Object): ClassMap {
  const attachResult = jss.createStyleSheet(styles).attach();
  return attachResult.classes;
}
