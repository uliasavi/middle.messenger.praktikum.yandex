import Block from "../../../utils/Block";
import template from "./AddModal.hbs";

interface AddModalProps {
  placeholder: string;
  btnTitle: string;
  class: string;
  events: {
    submit: (e: {
      preventDefault: () => void;
      target: HTMLFormElement | undefined;
    }) => void;
  };
}
export class AddModal extends Block<AddModalProps> {
  constructor(props: AddModalProps) {
    super({
      ...props,
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
