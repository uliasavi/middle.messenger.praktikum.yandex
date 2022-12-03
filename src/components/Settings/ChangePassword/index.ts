import Block from "../../../utils/Block";
import template from "./ChangePassword.hbs";
import { Label } from "../../general/Label";

interface ChangePasswordProps {
  events: {
    submit: (e) => void;
  };
}

export class ChangePasswordForm extends Block {
  constructor(props: ChangePasswordProps) {
    super({ ...props });
  }
  protected init(): void {
    this.children.oldPassword = new Label({
      label: "Введите текущий пароль",
      type: "password",
      id: "settings-password-old",
      name: "oldPassword",
    });
    this.children.newPassword = new Label({
      label: "Введите новый пароль",
      type: "password",
      id: "settings-password-new",
      name: "newPassword",
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
