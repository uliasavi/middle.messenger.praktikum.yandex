import Block from "../../../utils/Block";
import template from "./Message.hbs";
interface MessageProps {
  chat_id: number;
  content: string;
  file: null;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
  isMy:boolean;
}
export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
