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
  isMy?: boolean | undefined;
}
interface MessagesProps {
  selectedChat: number | undefined;
  messages: MessageProps[] | [] | undefined;
  userId: number;
}
export class Messages extends Block<MessagesProps> {
  constructor(props: MessagesProps) {
    super(props);
  }
  protected init(): void {
    this.children.messages = this.createMessages(this.props);
  }
  createMessages(props: MessagesProps) {
    if (!props.messages || props.messages.length == 0) {
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
      return new Message({ ...info });
    }
    const reverseMessage = props.messages.reverse();
    const activeChatMessages = reverseMessage.map((data) => {
      if (data.user_id == this.props.userId) {
        data.isMy = true;
      }
      return new Message({ ...data });
    });
    return activeChatMessages;
  }
  setScrollToBottom() {
    const chatHistory = document.getElementById("messagesBody");
    if (chatHistory) {
      const chatHeight = chatHistory.scrollHeight;
      chatHistory.scrollTop = chatHeight;
    }
  }
  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.children.messages = this.createMessages(newProps);
    return true;
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
