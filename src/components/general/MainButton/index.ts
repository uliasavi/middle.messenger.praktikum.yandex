import Block from "../../../utils/Block";
import template from "./MainButton.hbs";

interface ButtonProps {
  label: string;
  type?:string;
  events: {
    click: () => void;
  };
}

export class MainButton extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
