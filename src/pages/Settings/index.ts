import Block from "../../utils/Block";
import template from "./SettingsPage.hbs";
import { Label } from "../../components/general/Label/Label";
import { Link } from "../../components/general/Link/Link";

export class SettingsPage extends Block {
  constructor() {
    super({ disabled: true });
  }
  init(): void {
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
      label: "Имя",
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
    this.children.linkChangeData = new Link({
      label: "Изменить данные",
      class: "navLink",
      events: {
        click: () => this.onShowEditSettings(),
      },
    });
    this.children.linkChangePassword = new Link({
      label: "Изменить пароль",
      class: "navLink",
      events: {
        click: () => this.onShowEditPassword(),
      },
    });
    this.children.linkExit = new Link({
      label: "Выйти",
      class: "navLink red",
      events: {
        click: () => this.onClickExit(),
      },
    });
  }
  onClickExit(): void {
    renderPage("login");
    console.log("click");
  }
  onShowEditPassword(): void {
    console.log("onShowEditPassword");
  }
  onShowEditSettings(): void {
    this.setProps({ disabled: false });
  }
  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    for (let key in this.children) {
      const child = this.children[key];
      if (child instanceof Label) {
        child.setProps({ disabled: newProps.disabled });
      }
    }
    return false;
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
