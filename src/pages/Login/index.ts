import Block from "../../utils/Block";
import template from "./LoginPage.hbs";
import { Link } from "../../components/general/Link";
import { LoginForm } from "../../components/Login/LoginForm";

export class LoginPage extends Block {
  constructor() {
    super({});
  }
  init() {
    this.props.labelLogin = "Логин";
    this.props.labelPassword = "Пароль";
    this.children.loginForm = new LoginForm({
      events: {
        submit: (e: { preventDefault: () => void; target: HTMLFormElement | undefined }): void => this.onSubmit(e),
      },
    });
    this.children.link = new Link({
      label: "Нет аккаунта?",
      class: "nav-link",
      events: {
        click: (): void => this.onClick(),
      },
    });
  }
  onClick(): void {
    renderPage("registration");
  }
  onSubmit(e: { preventDefault: () => void; target: HTMLFormElement | undefined }): void {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);
    renderPage("chats");
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
