import BaseAPI from "./BaseAPI";
import { SignUpData, SignInData,UserData } from "../interfaces/auth";

export default class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }
  public signin(signinData: SignInData) {
    return this.http.post("/signin", signinData);
  }
  public signup(signupData: SignUpData) {
    return this.http.post("/signup", signupData);
  }
  public read():Promise<UserData> {
    return this.http.get("/user");
  }
  public logout() {
    return this.http.post("/logout");
  }
  update = undefined;
  create = undefined;
  delete = undefined;
}
