import Block from "../../../utils/Block";
import template from "./RegistrationForm.hbs";
import { Label } from "../../general/Label";

interface ChangePasswordProps {
  events: {
    submit: (e) => void;
  };
}

export class RegistrationForm extends Block {
  constructor(props: ChangePasswordProps) {
    super({ ...props });
  }
  protected init(): void {
    this.children.email = new Label({
      label: "Почта",
      type: "email",
      id: "email",
      name: "email",
    });
    this.children.login = new Label({
      label: "Логин",
      type: "text",
      id: "login",
      name: "login",
    });
    this.children.name = new Label({
      label: "Имя",
      type: "text",
      id: "first_name",
      name: "first_name",
    });
    this.children.secondName = new Label({
      label: "Фамилия",
      type: "text",
      id: "second_name",
      name: "second_name",
    });
    this.children.phone = new Label({
      label: "Телефон",
      type: "phone",
      id: "phone",
      name: "phone",
    });
    this.children.password = new Label({
      label: "Пароль",
      type: "password",
      id: "password",
      name: "password",
    });
    this.children.password_repeat = new Label({
      label: "Пароль(еще раз)",
      type: "password",
      id: "password_repeat",
      name: "password_repeat",
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
