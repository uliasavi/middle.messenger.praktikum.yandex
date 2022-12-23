import BaseAPI from "./BaseAPI";
import { PasswordData, UserData } from "../interfaces/user";

export default class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }
  public changePassword(passwordData: PasswordData) {
    return this.http.put("/password", passwordData);
  }
  public changeProfile(userData: UserData) {
    return this.http.put("/profile", userData);
  }
  public getProfile(id: number) {
    return this.http.get(`/${id}`);
  }
  create = undefined;
  read = undefined;
  delete = undefined;
  update = undefined;
}
