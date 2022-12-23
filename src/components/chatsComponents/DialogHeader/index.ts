import Block from "../../../utils/Block";
import template from "./DialogHeader.hbs";

interface DialogHeaderProps {
  avatar: string;
  display_name: string;
}
export class DialogHeader extends Block<DialogHeaderProps> {
  constructor(props: DialogHeaderProps) {
    super({
      ...props,
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
