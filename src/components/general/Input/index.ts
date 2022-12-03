import Block from "../../../utils/Block";
import template from "./Input.hbs";

interface InputProps {
  type: string;
  id: string;
  name: string;
  value?: string;
  disabled?: string;
  events: {
    focus: (e) => void;
    blur: (e) => void;
  };
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
