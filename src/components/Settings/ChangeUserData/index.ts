import Block from "../../../utils/Block";
import template from "./ChangeUserData.hbs";
import { Label } from "../../general/Label";

interface ChangePasswordProps {
  disabled: boolean;
  events: {
    submit: (e: { preventDefault: () => void; target: HTMLFormElement | undefined }) => void;
  };
}

export class ChangeUserDataForm extends Block<ChangePasswordProps> {
  constructor(props: ChangePasswordProps) {
    super({ ...props });
  }
  protected init(): void {
    this.children.login = new Label({
      label: "Логин",
      type: "text",
      id: "login",
      name: "login",
      value: "ivan",
      disabled: this.props.disabled,
    });
    this.children.name = new Label({
      label: "Имя",
      type: "text",
      id: "first_name",
      name: "first_name",
      value: "Иван",
      disabled: this.props.disabled,
    });
    this.children.secondName = new Label({
      label: "Фамилия",
      type: "text",
      id: "second_name",
      name: "second_name",
      value: "Иванов",
      disabled: this.props.disabled,
    });
    this.children.displayName = new Label({
      label: "Имя в чате",
      type: "text",
      id: "settings-display_name",
      name: "display_name",
      value: "Ванек",
      disabled: this.props.disabled,
    });
    this.children.phone = new Label({
      label: "Телефон",
      type: "phone",
      id: "phone",
      name: "phone",
      value: "899773444436",
      disabled: this.props.disabled,
    });
  }
  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    for (const key in this.children) {
      const child = this.children[key];
      if (child instanceof Label) {
        child.setProps({ disabled: newProps.disabled });
      }
    }
    return true;
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
