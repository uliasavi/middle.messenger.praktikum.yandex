import Block from "../../../utils/Block";
import template from "./ChangeUserData.hbs";
import { Label } from "../../general/Label";
import { withStore } from "../../../utils/Store";
import { InputFile } from "../InputFile";

interface ChangePasswordProps {
  disabled: string;
  events: {
    submit: (e: Event) => void;
  };
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  phone?: string;
}

class ChangeUserDataFormBase extends Block<ChangePasswordProps> {
  constructor(props: ChangePasswordProps) {
    super(props);
  }
  protected init() {
    this.children.inputAvatar = new InputFile({});
    this.children.login = new Label({
      label: "Логин",
      type: "text",
      id: "login",
      name: "login",
      value: this.props.login,
      disabled: this.props.disabled,
    });
    this.children.name = new Label({
      label: "Имя",
      type: "text",
      id: "first_name",
      name: "first_name",
      value: this.props.first_name,
      disabled: this.props.disabled,
    });
    this.children.secondName = new Label({
      label: "Фамилия",
      type: "text",
      id: "second_name",
      name: "second_name",
      value: this.props.second_name,
      disabled: this.props.disabled,
    });
    this.children.displayName = new Label({
      label: "Имя в чате",
      type: "text",
      id: "settings-display_name",
      name: "display_name",
      value: this.props.display_name,
      disabled: this.props.disabled,
    });
    this.children.phone = new Label({
      label: "Телефон",
      type: "phone",
      id: "phone",
      name: "phone",
      value: this.props.phone,
      disabled: this.props.disabled,
    });
  }
  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    for (const key in this.children) {
      const child = this.children[key];
      if (child instanceof Label) {
        child.setProps({
          disabled: newProps.disabled,
        });
      }
    }
    return true;
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ChangeUserDataForm = withUser(ChangeUserDataFormBase);
