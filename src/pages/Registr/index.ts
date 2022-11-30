import Block from "../../utils/Block";
import template from "./RegistrationPage.hbs";
import { MainButton } from "../../components/general/MainButton/MainButton";
import { Label } from "../../components/general/Label/Label";
import { Link } from "../../components/general/Link/Link";

export class RegistrationPage extends Block {
  constructor() {
    super("div");
  }
  init() {
    this.children.mainButton = new MainButton({
      label: "Зарегистрироваться",
      events: {
        click: () => this.onSubmit(),
      },
    });
    this.children.email = new Label({
      label: "Почта",
      type: "email",
      id: "email",
      name: "email",
    });
    this.children.login = new Label({
      label: "Логин",
      type: "text",
      id: "login",
      name: "login",
    });
    this.children.name = new Label({
      label: "Имя",
      type: "text",
      id: "first_name",
      name: "first_name",
    });
    this.children.secondName = new Label({
      label: "Фамилия",
      type: "text",
      id: "second_name",
      name: "second_name",
    });
    this.children.phone = new Label({
      label: "Телефон",
      type: "phone",
      id: "phone",
      name: "phone",
    });
    this.children.password = new Label({
      label: "Пароль",
      type: "password",
      id: "password",
      name: "password",
    });
    this.children.password_repeat = new Label({
      label: "Пароль(еще раз)",
      type: "password",
      id: "password_repeat",
      name: "password_repeat",
    });
    this.children.link = new Link({
      label: "Войти",
      class:"navLink",
      events: {
        click: () => this.onClick(),
      },
    });
  }
  onClick() {
    renderPage("login");
    console.log("click");
  }
  onSubmit() {
    renderPage("chats");
    console.log("Зарегистрироваться");
  }
  onfocus() {
    console.log("focus");
  }
  onblur() {
    console.log("blur");
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
