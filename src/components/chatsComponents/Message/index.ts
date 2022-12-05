import Block from "../../../utils/Block";
import template from "./Message.hbs";
interface MessageProps {
  text: string;
}
export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
