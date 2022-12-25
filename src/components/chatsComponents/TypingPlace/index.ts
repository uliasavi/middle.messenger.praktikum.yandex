import Block from "../../../utils/Block";
import template from "./TypingPlace.hbs";

interface TypingPlaceProps {
  events: {
    submit: (e: Event) => void;
  };
}
export class TypingPlace extends Block<TypingPlaceProps> {
  constructor(props: TypingPlaceProps) {
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
