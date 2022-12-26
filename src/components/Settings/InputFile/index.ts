import Block from "../../../utils/Block";
import template from "./InputFile.hbs";

export class InputFile extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
