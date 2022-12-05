import Block from "../../../utils/Block";
import template from "./TypingPlace.hbs";
import { InputFile } from "../InputFile/index";

interface TypingPlaceProps {
  events: {
    submit: (e: { preventDefault: () => void; target: HTMLFormElement | undefined }) => void;
  };
}
export class TypingPlace extends Block<TypingPlaceProps> {
  constructor(props: TypingPlaceProps) {
    super({ ...props });
  }
  protected init(): void {
    this.children.inputFile = new InputFile();
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
