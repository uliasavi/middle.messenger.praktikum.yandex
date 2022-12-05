import Block from "../../../utils/Block";
import template from "./Link.hbs";

interface LinkProps {
  label: string;
  class:string;
  events: {
    click: () => void;
  };
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
