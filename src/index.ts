import { LoginPage } from "./pages/Login";
import { RegistrationPage } from "./pages/Registr";
import { ErrorPage } from "./pages/Error";
import { ChatsPage } from "./pages/Chats";
import { SettingsPage } from "./pages/Settings";
import "./main.scss";

const root = document.querySelector("#app");
const startPage = new LoginPage();

window.addEventListener("DOMContentLoaded", () => {
  root?.append(startPage.getContent()!);
});

function renderPage(pageName: string) {
  let page = new LoginPage();
  switch (pageName) {
    case "login":
      page = new LoginPage();
      break;
    case "registration":
      page = new RegistrationPage();
      break;
    case "chats":
      page = new ChatsPage();
      break;
    case "settingsPage":
      page = new SettingsPage();
      break;
    default:
      page = new ErrorPage();
      break;
  }
  root.innerHTML = "";
  root?.append(page.getContent()!);
}
window.renderPage = renderPage;
