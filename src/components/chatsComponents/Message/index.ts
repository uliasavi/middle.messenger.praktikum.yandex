import Block from "../../../utils/Block";
import template from "./Message.hbs";

export class Message extends Block {
  constructor() {
    super("div");
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
