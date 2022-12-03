import Block from "../../../utils/Block";
import template from "./DialogList.hbs";
interface DialogMiniInterface {
  unreadMessage: number;
  friendName: string;
  friendPicture: string;
  dialogId: string;
}
interface DialogListProps {
  countOfDialogs: number;
  dialogs: [DialogMiniInterface];
  events: {
    click: (e) => void;
  };
}
export class DialogList extends Block {
  constructor(props: DialogListProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
