import Block from "../../../utils/Block";
import template from "./Validation.hbs";

interface ValidationProps {
  message: string;
  isUnvalid: boolean;
}

export class Validation extends Block<ValidationProps> {
  constructor(props: ValidationProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
