import Block from "../../../../utils/Block";
import template from "./Dialog.hbs";

interface DialogProps {
  id: string;
  title: string;
  unread_count: number;
  events: {
    click: (e: { target: { id: number } }) => void;
  };
}
export class Dialog extends Block<DialogProps> {
  constructor(props: DialogProps) {
    super({
      ...props,
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
