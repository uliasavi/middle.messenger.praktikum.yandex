import Block from "../../../utils/Block";
import template from "./Link.hbs";
import Router from "../../../utils/Router";

interface LinkProps {
  to: string;
  label: string;
  class: string;
  events?: {
    click: () => void;
  };
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
    });
  }
  navigate() {
    Router.go(this.props.to);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
