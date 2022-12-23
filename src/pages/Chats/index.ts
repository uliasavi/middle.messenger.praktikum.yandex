import Block from "../../utils/Block";
import template from "./ChatsPage.hbs";
import { Message } from "../../components/chatsComponents/Message/index";
import { DialogList } from "../../components/chatsComponents/DialogList";
import { TypingPlace } from "../../components/chatsComponents/TypingPlace";
import { Link } from "../../components/general/Link";
import store, { withStore } from "../../utils/Store";
import { ChatSettings } from "../../components/chatsComponents/ChatsSettings";
import { DialogHeader } from "../../components/chatsComponents/DialogHeader";
import ChatsController from "../../controllers/ChatsController";

interface DialogMiniInterface {
  avatar: null;
  created_by: number;
  id: number;
  last_message: null;
  title: string;
  unread_count: number;
}

interface ChatsPageProps {
  display_name: string;
  avatar: string;
  chats: DialogMiniInterface[];
  activeChatID: number;
}

class ChatsPageBase extends Block<ChatsPageProps> {
  constructor(props: ChatsPageProps) {
    super({ ...props });
  }

  init() {
    ChatsController.getAllChats();
    this.setProps({
      display_name: store.getState().chats[0]?.title,
      chats: store.getState().chats,
      activeChatID: store.getState().activeChatID,
      avatar:
        "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.625/c_scale,w_400/ncom/en_US/games/switch/b/bear-and-breakfast-switch/description-image",
    });
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
    this.children.message = new Message({
      text: "",
    });
    this.children.typingPlace = new TypingPlace({
      events: {
        submit: (e: {
          preventDefault: () => void;
          target: HTMLFormElement | undefined;
        }): void => {
          return this.sendMessage(e);
        },
      },
    });
    this.children.settings = new ChatSettings({
      chatId: this.setActiveChat(this.props.chats)?.id,
    });
  }
  sendMessage(e: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }): void {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    if (formData.message || formData.file.size != 0) {
      this.children.message.setProps({ text: formData.message });
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
    this.children.dialogList = new DialogList({
      chats: newProps.chats,
    });
    this.children.dialogHeader = new DialogHeader({
      display_name: this.setActiveChat(newProps.chats)?.title,
      avatar: newProps.avatar,
    });
    this.children.settings = new ChatSettings({
      chatId: this.setActiveChat(newProps.chats)?.id,
    });
    //this.children.dialogList.setProps({chats: newProps.chats})
    return true;
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

const withChats = withStore((state) => ({
  ...state,
}));

export const ChatsPage = withChats(ChatsPageBase);
