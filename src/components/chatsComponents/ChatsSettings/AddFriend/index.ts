import Block from "../../../../utils/Block";
import template from "./AddFriend.hbs";

interface AddFriendProps {
  title: string;
  events: {
    click: () => void;
  };
}
export class AddFriend extends Block<AddFriendProps> {
  constructor(props: AddFriendProps) {
    super({
      ...props,
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
