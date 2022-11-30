import Block from "../../../utils/Block";
import template from "./DialogMini.hbs";

export class DialogMini extends Block {
  constructor() {
    super("div");
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
