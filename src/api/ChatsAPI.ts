import BaseAPI from "./BaseAPI";

interface addUsersData {
  users: number[];
  chatId: number;
}

export default class ChatsAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }
  public getAllChats() {
    return this.http.get();
  }
  public createChat(chatsName: string) {
    return this.http.post("", { title: chatsName });
  }
  public addUserToChat(data: addUsersData) {
    return this.http.put("/users", data);
  }
  create = undefined;
  delete = undefined;
  read = undefined;
  update = undefined;
}
