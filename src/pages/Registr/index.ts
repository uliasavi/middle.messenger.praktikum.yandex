import Block from "../../utils/Block";
import template from "./RegistrationPage.hbs";
import { RegistrationForm } from "../../components/Registration/RegistrationForm/index";
import { Link } from "../../components/general/Link";
import AuthController from "../../controllers/AuthController";
import { SignUpData } from "../../interfaces/auth";

export class RegistrationPage extends Block {
  constructor() {
    super({});
  }
  init() {
    this.children.registrationForm = new RegistrationForm({
      events: {
        submit: (e: Event): void => this.onSubmit(e),
      },
    });
    this.children.link = new Link({
      label: "Войти",
      class: "nav-link",
      to: "/",
    });
  }
  onSubmit(e: Event): void {
    e.preventDefault();
    const formData: any  = Object.fromEntries(new FormData(e.target).entries());
    delete formData.password_repeat;
    AuthController.signup(formData);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
