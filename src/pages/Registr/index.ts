import Block from "../../utils/Block";
import template from "./RegistrationPage.hbs";
import { RegistrationForm } from "../../components/Registration/RegistrationForm/index";
import { Link } from "../../components/general/Link";

export class RegistrationPage extends Block {
  constructor() {
    super({});
  }
  init() {
    this.children.registrationForm = new RegistrationForm({
      events: {
        submit: (e: { preventDefault: () => void; target: HTMLFormElement | undefined }): void => this.onSubmit(e),
      },
    });
    this.children.link = new Link({
      label: "Войти",
      class: "nav-link",
      events: {
        click: ():void => this.onClick(),
      },
    });
  }
  onClick() {
    renderPage("login");
  }
  onSubmit(e: { preventDefault: () => void; target: HTMLFormElement | undefined; }):void {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);
    renderPage("chats");
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
