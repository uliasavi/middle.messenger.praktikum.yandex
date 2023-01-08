import Block from "../../utils/Block";
import template from "./ChatsPage.hbs";
import { Messages } from "../../components/chatsComponents/Messages";
import { DialogList } from "../../components/chatsComponents/DialogList";
import { TypingPlace } from "../../components/chatsComponents/TypingPlace";
import { Link } from "../../components/general/Link";
import store, { withStore } from "../../utils/Store";
import { ChatSettings } from "../../components/chatsComponents/ChatsSettings";
import { DialogHeader } from "../../components/chatsComponents/DialogHeader";
import messagesController from "../../controllers/MessagesController";
import ChatsController from "../../controllers/ChatsController";

interface MessageProps {
  chat_id: number;
  content: string;
  file: null;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}
interface DialogMiniInterface {
  avatar: null;
  created_by: number;
  id: number;
  last_message: null;
  title: string;
  unread_count: number;
}
interface User {
  avatar: null;
  display_name: string;
  email: string;
  first_name: string;
  id: number;
  login: string;
  phone: string;
  second_name: string;
}
interface ChatsPageProps {
  display_name: string;
  avatar: string;
  chats: DialogMiniInterface[];
  activeChatID: number;
  messages: Record<string, MessageProps[]>;
  user: User;
}

class ChatsPageBase extends Block<ChatsPageProps> {
  constructor(props: ChatsPageProps) {
    super({
      ...props,
      display_name: "Выберите чат..",
      chats: store.getState().chats,
      activeChatID: store.getState().activeChatID,
    });
  }

  init() {
    this.children.dialogHeader = new DialogHeader({
      display_name: this.props.display_name,
      avatar: this.props.avatar,
    });
    this.children.link = new Link({
      label: "Профиль →",
      class: "nav-link white",
      to: "/settings",
    });
    this.children.dialogList = new DialogList({
      chats: this.props.chats,
    });
    this.children.typingPlace = new TypingPlace({
      events: {
        submit: (e: { preventDefault: () => void; target: HTMLFormElement; }): void => {
          return this.sendMessage(e);
        },
      },
    });
    this.children.settings = new ChatSettings({
      chatId: this.setActiveChat(this.props.chats)?.id,
    });
    this.children.messages = new Messages({
      selectedChat: this.props.activeChatID,
      messages: this.setActiveChatMessages(
        this.props.messages,
        this.props.activeChatID
      ),
      userId: this.props.user?.id,
    });
    ChatsController.getAllChats();
  }
  setActiveChatMessages(
    messages: Record<string, MessageProps[]>,
    activeChatID: number | undefined
  ): MessageProps[] | undefined {
    if (!messages || !activeChatID) {
      return [];
    }
    let activeChatMessages;
    for (const key in messages) {
      const element: MessageProps[] = messages[key];
      if (key == activeChatID.toString()) {
        activeChatMessages = element;
      }
    }

    return activeChatMessages;
  }
  sendMessage(e: { preventDefault: () => void; target: HTMLFormElement; }): void {
    e.preventDefault();
    const target = e. target as HTMLFormElement;
    const formData = Object.fromEntries(new FormData(target).entries());
    if (formData.message) {
      const chatId = this.props.activeChatID;
      messagesController.sendMessage(chatId, formData.message);
      e.target.reset();
    }
  }
  setActiveChat(chats: DialogMiniInterface[]): DialogMiniInterface {
    if (!chats) {
      return {
        avatar: null,
        created_by: 0,
        id: 0,
        last_message: null,
        title: "",
        unread_count: 0,
      };
    }
    const currentChat = chats?.filter((el: DialogMiniInterface) => {
      return el.id == this.props.activeChatID;
    });
    return currentChat[0] || {};
  }
  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    (this.children.settings as Block).setProps({
      chatId: this.setActiveChat(newProps.chats)?.id,
    });
    (this.children.dialogHeader as Block).setProps({
      display_name: this.setActiveChat(newProps.chats)?.title,
    });
    (this.children.dialogList as Block).setProps({ chats: newProps.chats });
    (this.children.messages as Block).setProps({
      selectedChat: newProps.activeChatID,
      messages: this.setActiveChatMessages(
        newProps.messages,
        newProps.activeChatID
      ),
    });
    return false;
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

const withChats = withStore((state) => ({
  ...state,
}));

export const ChatsPage = withChats(ChatsPageBase);
