import Block from "../../../utils/Block";
import template from "./NewChat.hbs";

interface NewChatProps {
  events: {
    click: () => void;
  };
}
export class NewChat extends Block<NewChatProps> {
  constructor(props: NewChatProps) {
    super({
      ...props,
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
