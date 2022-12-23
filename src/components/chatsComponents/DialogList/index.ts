import Block from "../../../utils/Block";
import template from "./DialogList.hbs";
import { NewChat } from "../NewChat/index";
import { AddModal } from "../AddModal/index";
import { Dialog } from "./Dialog";
import ChatsController from "../../../controllers/ChatsController";
import store, { withStore } from "../../../utils/Store";
//3246
//3528

interface DialogMiniInterface {
  avatar: null;
  created_by: number;
  id: number;
  last_message: null;
  title: string;
  unread_count: number;
}
interface DialogListProps {
  openModal?: boolean;
  chats: DialogMiniInterface[];
}
class DialogListBase extends Block<DialogListProps> {
  constructor(props: DialogListProps) {
    super({ ...props });
  }
  protected init(): void {
    this.children.button = new NewChat({
      events: {
        click: () => this.addChats(),
      },
    });
    this.children.modal = new AddModal({
      class: "hide",
      placeholder: "Придумайте имя чата...",
      btnTitle: "Создать",
      events: {
        submit: (e) => this.AddModal(e),
      },
    });
    this.children.chats = this.createChats(this.props);
  }
  private createChats(props: DialogListProps) {
    if (!props.chats) {
      return;
    }
    return props.chats.map((data) => {
      return new Dialog({
        id: data.id,
        title: data.title,
        unread_count: data.unread_count,
        events: {
          click: (e: { target: { id: number } }) => {
            this.chooseChat(e);
          },
        },
      });
    });
  }
  chooseChat(e: { target: { id: number } }) {
    const currentDialogID = e.target.id;
    store.set("activeChatID", +currentDialogID);
  }
  addChats() {
    this.children.modal.setProps({ class: "" });
  }
  AddModal(e: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }) {
    e.preventDefault();
    const formData: any = Object.fromEntries(new FormData(e.target).entries());
    if (formData.title) {
      ChatsController.createChat(formData.title);
    }
    this.children.modal.setProps({ class: "hide" });
  }
  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.children.modal.setProps({
      openModal: newProps.openModal,
    });
    this.children.chats = this.createChats(newProps);

    return true;
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

const withChats = withStore((state) => ({ ...state.chats }));

export const DialogList = withChats(DialogListBase);
