import Block from "../../utils/Block";
import template from "./ChatsPage.hbs";
import { Message } from "../../components/chatsComponents/Message/index";
import { DialogList } from "../../components/chatsComponents/DialogList";
import { TypingPlace } from "../../components/chatsComponents/TypingPlace";

export class ChatsPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.dialogList = new DialogList({
      countOfDialogs: 4,
      dialogs: [
        {
          unreadMessage: 2,
          friendName: "Ivan",
          friendPicture: "../../../assets/avatar.jpg",
          dialogId: "dialog1",
        },
        {
          unreadMessage: 3,
          friendName: "Lucy",
          friendPicture: "../../../assets/avatar.jpg",
          dialogId: "dialog2",
        },
        {
          unreadMessage: 1,
          friendName: "Jhon",
          friendPicture: "../../../assets/avatar.jpg",
          dialogId: "dialog3",
        },
      ],
      events: {
        click: (e) => this.clickOnDialogMini(e),
      },
    });
    this.children.message = new Message({
      text: "",
    });
    this.children.typingPlace = new TypingPlace({
      events: {
        submit: (e: { preventDefault: () => void; target: HTMLFormElement | undefined }): void => {
          return this.sendMessage(e);
        },
      },
    });
  }
  sendMessage(e: { preventDefault: () => void; target: HTMLFormElement | undefined }):void {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    if (formData.message || formData.file.size != 0) {
      console.log(formData);
      this.children.message.setProps({ text: formData.message });
      e.target.reset();
    }
  }
  clickOnDialogMini(e: { target: { id: string } }):void {
    const currentDialogID = e.target.id;
    console.log(currentDialogID);
    const dialogList = this.children.dialogList.props.dialogs;
    dialogList.forEach((element: { dialogId: string }) => {
      if (element.dialogId == currentDialogID) {
        console.log(element);
      }
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
