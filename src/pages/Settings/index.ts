import Block from "../../utils/Block";
import template from "./SettingsPage.hbs";
import { Label } from "../../components/general/Label";
import { Link } from "../../components/general/Link";
import { ChangePasswordForm } from "../../components/Settings/ChangePassword/index";
import { ChangeUserDataForm } from "../../components/Settings/ChangeUserData/index";

export class SettingsPage extends Block {
  constructor() {
    super({
      disabled: true,
      hidePasswordChange: false,
      hideDataChange: true,
      hideLink: false,
      hideAcceptDataBtn: true,
    });
  }
  init(): void {
    this.children.changePasswordForm = new ChangePasswordForm({
      events: {
        submit: (e) => this.changePassword(e),
      },
    });
    this.children.changeUserDataForm = new ChangeUserDataForm({
      disabled: this.props.disabled,
      events: {
        submit: (e) => this.changeUserData(e),
      },
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
  showMainSettings() {
    this.setProps({ disabled: true });
    this.setProps({ hidePasswordChange: false });
    this.setProps({ hideDataChange: true });
    this.setProps({ hideLink: false });
  }
  changePassword(e: { preventDefault: () => void; target: HTMLFormElement | undefined }) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);
    this.showMainSettings();
  }
  changeUserData(e: { preventDefault: () => void; target: HTMLFormElement | undefined }) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);
    this.showMainSettings();
  }
  onClickExit(): void {
    renderPage("login");
    console.log("click");
  }
  onShowEditPassword(): void {
    this.setProps({ disabled: false });
    this.setProps({ hidePasswordChange: true });
    this.setProps({ hideDataChange: false });
    this.setProps({ hideLink: true });
  }
  onShowEditSettings(): void {
    this.setProps({ disabled: false });
    this.setProps({ hideAcceptDataBtn: false });
    this.setProps({ hideLink: true });
  }
  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.children.changeUserDataForm.setProps({ disabled: newProps.disabled });
    return true;
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
