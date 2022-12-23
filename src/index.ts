import { LoginPage } from "./pages/Login";
import { RegistrationPage } from "./pages/Registr";
import { ErrorPage } from "./pages/Error";
import { ChatsPage } from "./pages/Chats";
import { SettingsPage } from "./pages/Settings";
import "./main.scss";
import Router from "./utils/Router";
import AuthController from "./controllers/AuthController";
import ChatsController from "./controllers/ChatsController";

enum Routes {
  Index = "/",
  Register = "/sign-up",
  Profile = "/settings",
  Chats = "/messenger",
  Error = "/404",
}
window.addEventListener("DOMContentLoaded", async () => {
  Router.use(Routes.Index, LoginPage)
    .use(Routes.Register, RegistrationPage)
    .use(Routes.Profile, SettingsPage)
    .use(Routes.Chats, ChatsPage)
    .use(Routes.Error, ErrorPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
    case Routes.Chats:
      await ChatsController.getAllChats();
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
