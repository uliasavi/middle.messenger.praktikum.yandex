import Block from "../../../utils/Block";
import template from "./Label.hbs";
import { Input } from "../Input";
import { Validation } from "../Validation/index";
import {
  loginValidation,
  passwordValidation,
  emailValidation,
  nameValidation,
  secondnameValidation,
  repeatPasswordValidation,
  oldPasswordValidation,
  newPasswordValidation,
  displayNameValidation,
} from "./ValidationBus";

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
        focus: (e) => this.onfocus(e),
        blur: (e) => this.onblur(e),
      },
    });
    this.children.validation = new Validation({
      message: "ss",
      isUnvalid: false,
    });
  }
  onfocus(e) {
    console.log("focus");
  }
  onblur(e: { target: { value: any } }) {
    const typeOfInput = this.children.input.props.name;
    switch (typeOfInput) {
      case "login":
        loginValidation(e.target.value, this);
        break;
      case "password":
        passwordValidation(e.target.value, this);
        break;
      case "email":
        emailValidation(e.target.value, this);
        break;
      case "first_name":
        nameValidation(e.target.value, this);
        break;
      case "second_name":
        secondnameValidation(e.target.value, this);
        break;
      case "password_repeat":
        repeatPasswordValidation(e.target.value, this);
        break;
      case "display_name":
        displayNameValidation(e.target.value, this);
        break;
      case "oldPassword":
        oldPasswordValidation(e.target.value, this);
        break;
      case "newPassword":
        newPasswordValidation(e.target.value, this);
        break;
    }
  }
  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.children.input.setProps({ disabled: newProps.disabled });
    this.children.input.setProps({ isError: newProps.isError });
    return false;
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
