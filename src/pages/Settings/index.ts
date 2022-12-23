import Block from "../../utils/Block";
import template from "./SettingsPage.hbs";
import { ChangePasswordForm } from "../../components/Settings/ChangePassword/index";
import { ChangeUserDataForm } from "../../components/Settings/ChangeUserData/index";
import { Button } from "../../components/general/Button";
import UserController from "../../controllers/UserController";
import AuthController from "../../controllers/AuthController";
import store, { withStore } from "../../utils/Store";
import { merge } from "../../utils/helpers";

interface SettingsPageProps {
  display_name: string;
  avatar: string;
  disabled: boolean;
  hidePasswordChange: boolean;
  hideDataChange: boolean;
  hideLink: boolean;
  hideAcceptDataBtn: boolean;
}

class SettingsPageBase extends Block<SettingsPageProps> {
  constructor(props: SettingsPageProps) {
    super({
      ...props,
      disabled: true,
      hidePasswordChange: false,
      hideDataChange: true,
      hideLink: false,
      hideAcceptDataBtn: true,
    });
  }
  init() {
    this.children.changePasswordForm = new ChangePasswordForm({
      events: {
        submit: (e) => this.changePassword(e),
      },
    });
    this.children.changeUserDataForm = new ChangeUserDataForm({
      disabled: this.props.disabled,
      events: {
        submit: (e: {
          preventDefault: () => void;
          target: HTMLFormElement | undefined;
        }) => this.changeUserData(e),
      },
    });
    this.children.linkChangeData = new Button({
      label: "Изменить данные",
      class: "nav-link",
      events: {
        click: () => this.onShowEditSettings(),
      },
    });
    this.children.linkChangePassword = new Button({
      label: "Изменить пароль",
      class: "nav-link",
      events: {
        click: () => this.onShowEditPassword(),
      },
    });
    this.children.linkExit = new Button({
      label: "Выйти",
      class: "nav-link red",
      events: {
        click: () => this.logOut(),
      },
    });
  }
  logOut() {
    AuthController.logout();
  }
  showMainSettings() {
    this.setProps({ disabled: true });
    this.setProps({ hidePasswordChange: false });
    this.setProps({ hideDataChange: true });
    this.setProps({ hideLink: false });
  }
  changePassword(e: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }): void {
    e.preventDefault();
    const formData: any = Object.fromEntries(new FormData(e.target).entries());
    UserController.changePassword(formData);
    this.showMainSettings();
  }
  changeUserData(e: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }): void {
    e.preventDefault();
    const formData: any = Object.fromEntries(new FormData(e.target).entries());
    const email = store.getState().user.email;
    const data: any = merge(formData, { email });
    UserController.changeProfile(data);
    this.showMainSettings();
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
    this.children.changeUserDataForm.setProps({
      disabled: newProps.disabled,
    });
    return true;
  }
  render() {
    return this.compile(template, this.props);
  }
}
const withUser = withStore((state) => ({ ...state.user }));

export const SettingsPage = withUser(SettingsPageBase);
