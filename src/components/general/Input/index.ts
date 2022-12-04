import Block from "../../../utils/Block";
import template from "./Input.hbs";

interface InputProps {
  type: string;
  id: string;
  name: string;
  value?: string;
  disabled?: string;
  events: {
    focus: (e: { target: { value: string } }) => void;
    blur: (e: { target: { value: string } }) => void;
  };
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
