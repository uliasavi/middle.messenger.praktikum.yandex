import Block from "../../../utils/Block";
import template from "./Button.hbs";

interface ButtonProps {
  label: string;
  class: string;
  events: {
    click: () => void;
  };
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
