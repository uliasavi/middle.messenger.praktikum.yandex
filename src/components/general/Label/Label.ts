import Block from "../../../utils/Block";
import template from "./Label.hbs";
import { Input } from "../Input/Input";

interface LabelProps {
  label: string;
}

export class Label extends Block {
  constructor(props: LabelProps) {
    super({ ...props });
  }
  init() {
    this.children.input = new Input({
      type: this.props.type,
      id: this.props.id,
      name: this.props.name,
      value: this.props.value,
      disabled: this.props.disabled,
      events: {
        focus: () => this.onfocus(),
        blur: () => this.onblur(),
      },
    });
  }
  onfocus() {
    console.log("focus");
  }
  onblur() {
    console.log("blur");
  }
  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.children.input.setProps({ disabled: newProps.disabled });
    return false;
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
