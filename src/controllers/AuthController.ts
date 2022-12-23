import AuthAPI from "../api/AuthAPI";
import { SignInData, SignUpData } from "../interfaces/auth";
import store from "../utils/Store";
import Router from "../utils/Router";

class AuthController {
  private api = new AuthAPI();

  async signup(signupData: SignUpData) {
    try {
      await this.api.signup(signupData);
      await this.fetchUser();
      Router.go("/messenger");
    } catch (e) {
      console.error("signup:", e);
    }
  }

  async signin(signinData: SignInData) {
    try {
      await this.api.signin(signinData);
      await this.fetchUser();
      Router.go("/messenger");
    } catch (e) {
      console.error("signin:", e);
    }
  }

  async logout() {
    try {
      await this.api.logout();
      Router.go("/");
    } catch (e) {
      console.error("logout:", e);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.read();
      store.set("user", user);
    } catch (e) {
      console.error("fetchUser:", e);
    }
  }
}

export default new AuthController();
