import Block from "../../../utils/Block";
import template from "./ChatSettings.hbs";
import { AddFriend } from "./AddFriend";
import { AddModal } from "../AddModal";
import ChatsController from "../../../controllers/ChatsController";

interface addUsersData {
  users: number[];
  chatId: number;
}

interface ChatSettingsProps {
  chatId: number;
  openModal?: boolean;
  showAddBtn?: boolean;
  events?: {
    click: () => void;
  };
}
export class ChatSettings extends Block<ChatSettingsProps> {
  constructor(props: ChatSettingsProps) {
    super({
      ...props,
      showAddBtn: true,
    });
  }
  protected init(): void {
    this.children.addFriends = new AddFriend({
      title: "Добавить собеседника",
      events: {
        click: () => this.addFriendAction(),
      },
    });
    this.children.addModal = new AddModal({
      placeholder: "Введите id...",
      btnTitle: "Добавить",
      class: "hide",
      events: {
        submit: (e) => this.addModal(e),
      },
    });
  }
  addModal(e: Event) {
    e.preventDefault();
    const formData: any = Object.fromEntries(new FormData(e.target as HTMLFormElement ).entries());
    const data: addUsersData = {
      users: [formData.title],
      chatId: this.props.chatId,
    };
    if (data.users && data.chatId) {
      ChatsController.addUserToChat(data);
    }
    (this.children.addModal as Block).setProps({ class: "hide" });
    this.setProps({ showAddBtn: true });
  }
  addFriendAction() {
    this.setProps({ showAddBtn: false });
    (this.children.addModal as Block).setProps({ class: "" });
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    (this.children.addModal as Block).setProps({
      openModal: newProps.openModal,
    });
    return true;
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
