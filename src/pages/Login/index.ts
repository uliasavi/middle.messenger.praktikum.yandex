import Block from "../../utils/Block";
import template from "./LoginPage.hbs";
import { Link } from "../../components/general/Link";
import { LoginForm } from "../../components/Login/LoginForm";
import AuthController from "../../controllers/AuthController";

export class LoginPage extends Block {
  constructor() {
    super({});
  }
  init() {
    this.props.labelLogin = "Логин";
    this.props.labelPassword = "Пароль";
    this.children.loginForm = new LoginForm({
      events: {
        submit: (e: {
          preventDefault: () => void;
          target: HTMLFormElement | undefined;
        }): void => this.onSubmit(e),
      },
    });
    this.children.link = new Link({
      to: "/sign-up",
      label: "Нет аккаунта?",
      class: "nav-link",
    });
  }
  onSubmit(e: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }): void {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData: any = Object.fromEntries(new FormData(target).entries());
    AuthController.signin(formData);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
