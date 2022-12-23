import UserAPI from "../api/UserAPI";
import store from "../utils/Store";
import { PasswordData, UserData } from "../interfaces/user";

class UserController {
  private api = new UserAPI();

  async changePassword(passwordData: PasswordData) {
    try {
      await this.api.changePassword(passwordData);
    } catch (e) {
      console.error("changePassword:", e);
    }
  }

  async changeProfile(userData: UserData) {
    try {
      await this.api.changeProfile(userData);
      location.reload();
    } catch (e) {
      console.error("changeProfile:", e);
    }
  }

  async getProfile() {
    try {
      const id = store.getState().user.id;
      await this.api.getProfile(id);
    } catch (e) {
      console.error("changeProfile:", e);
    }
  }
}

export default new UserController();
