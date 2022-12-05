import Block from "../../../utils/Block";
import template from "./LoginForm.hbs";
import { Label } from "../../general/Label";

interface ChangePasswordProps {
  events: {
    submit: (e: { preventDefault: () => void; target: HTMLFormElement | undefined }) => void;
  };
}

export class LoginForm extends Block<ChangePasswordProps> {
  constructor(props: ChangePasswordProps) {
    super({ ...props });
  }
  protected init(): void {
    this.children.login = new Label({
      label: "Логин",
      type: "text",
      id: "login",
      name: "login",
    });
    this.children.password = new Label({
      label: "Пароль",
      type: "password",
      id: "password",
      name: "password",
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
