
export class Logger {
  private label: string;

  constructor(label: string) {
    this.label = label;
  }

  info(msg: string, ...args) {
    console.log(this.format(msg), ...args);
  }

  warn(msg: string, ...args) {
    console.warn(this.format(msg), ...args);
  }

  error(msg: string, ...args) {
    console.error(this.format(msg), ...args);
  }

  private format(msg: string): string {
    if (!this.label) {
      return msg;
    }

    return `[${this.label}] ${msg}`;
  }
}
