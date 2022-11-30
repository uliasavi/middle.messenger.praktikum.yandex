import Block from "../../utils/Block";
import template from "./400error.hbs";

export class ErrorPage extends Block {
  constructor() {
    super("div");
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
