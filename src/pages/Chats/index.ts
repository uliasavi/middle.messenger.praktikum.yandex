import Block from "../../utils/Block";
import template from "./ChatsPage.hbs";
import { DialogMini } from "../../components/chatsComponents/DialogMini/index";
import { InputFile } from "../../components/chatsComponents/InputFile/index";
import { Message } from "../../components/chatsComponents/Message/index";

export class ChatsPage extends Block {
  constructor() {
    super("div");
  }

  init() {
    this.children.dialog = new DialogMini();
    this.children.message = new Message();
    this.children.inputFile = new InputFile();
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
