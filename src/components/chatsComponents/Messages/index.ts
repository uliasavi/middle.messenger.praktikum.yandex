import Block from "../../../utils/Block";
import template from "./Messages.hbs";
import { Message } from "../Message";

interface MessageProps {
  chat_id: number;
  content: string;
  file: null;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
  isMy?: boolean;
}
interface MessagesProps {
  selectedChat: number | undefined;
  messages: MessageProps[] | []| undefined;
  userId: number;
}
export class Messages extends Block<MessagesProps> {
  constructor(props: MessagesProps) {
    super({ ...props });
  }
  protected init(): void {
    this.children.messages = this.createMessages(this.props);
  }
  createMessages(props: MessagesProps) {
    if (props.messages.length == 0) {
      const info = {
        chat_id: 0,
        content: "",
        file: null,
        id: 0,
        is_read: true,
        time: "",
        type: "",
        user_id: 0,
        isMy: false,
      };
      if (info.user_id == this.props.userId) {
        info.isMy = true;
      }
      return new Message({ ...info });
    }
    const activeChatMessages = props.messages.map((data) => {
      if (data.user_id == this.props.userId) {
        data.isMy = true;
      }
      return new Message({ ...data });
    });
    return activeChatMessages;
  }
  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.children.messages = this.createMessages(newProps);
    return true;
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
