import Block from "../../utils/Block";
import template from "./LoginPage.hbs";
import { MainButton } from "../../components/general/MainButton/MainButton";
import { Label } from "../../components/general/Label/Label";
import { Link } from "../../components/general/Link/Link";

export class LoginPage extends Block {
  constructor() {
    super({});
  }
  init() {
    this.props.labelLogin = "Логин";
    this.props.labelPassword = "Пароль";
    this.children.mainButton = new MainButton({
      label: "Авторизоваться",
      type: "submit",
      events: {
        click: () => this.onSubmit(),
      },
    });
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
    this.children.link = new Link({
      label: "Нет аккаунта?",
      class: "navLink",
      events: {
        click: () => this.onClick(),
      },
    });
  }
  onClick() {
    renderPage("registration");
    console.log("click");
  }
  onSubmit() {
    renderPage("chats");
    console.log("авторизоваться");
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
