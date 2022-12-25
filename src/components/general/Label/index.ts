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
  phoneValidation,
} from "./ValidationBus";

interface LabelProps {
  label: string;
  type: string;
  id: string;
  name: string;
  value?: string;
  disabled?: string;
}
interface Context {
  children: { validation: { setProps: (arg0: { isUnvalid: boolean; message: string }) => void } }
}
export class Label extends Block<LabelProps> {
  constructor(props: LabelProps) {
    super(props);
  }
  init() {
    this.children.input = new Input({
      type: this.props.type,
      id: this.props.id,
      name: this.props.name,
      value: this.props.value,
      disabled: this.props.disabled,
      events: {
        focus: (e: { target: { value: string } }) => this.onfocus(e),
        blur: (e: { target: { value: string } }) => this.onblur(e),
      },
    });
    this.children.validation = new Validation({
      message: "ss",
      isUnvalid: false,
    });
  }
  onfocus(e: { target: { value: string } }) {
    console.log("focus");
  }
  onblur(e: { target: { value: string } }) {
    const typeOfInput = this.children.input.props.name;
    switch (typeOfInput) {
      case "login":
        loginValidation(e.target.value, this as unknown as Context);
        break;
      case "password":
        passwordValidation(e.target.value, this as unknown as Context);
        break;
      case "email":
        emailValidation(e.target.value, this as unknown as Context);
        break;
      case "first_name":
        nameValidation(e.target.value, this as unknown as Context);
        break;
      case "second_name":
        secondnameValidation(e.target.value, this as unknown as Context);
        break;
      case "password_repeat":
        repeatPasswordValidation(e.target.value, this as unknown as Context);
        break;
      case "display_name":
        displayNameValidation(e.target.value, this as unknown as Context);
        break;
      case "oldPassword":
        oldPasswordValidation(e.target.value, this as unknown as Context);
        break;
      case "newPassword":
        newPasswordValidation(e.target.value, this as unknown as Context);
        break;
      case "phone":
        phoneValidation(e.target.value, this as unknown as Context);
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
