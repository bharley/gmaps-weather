
export function hasClass(node: Node, className: string): boolean {
  return hasClasses(node, [className]);
}

export function hasClasses(node: Node, classes: string[]): boolean {
  if (!(node instanceof HTMLElement) || !node.classList) {
    return false;
  }

  return classes.every(className => node.classList.contains(className));
}
