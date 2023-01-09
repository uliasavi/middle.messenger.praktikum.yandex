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
  public create(chatsName: string) {
    return this.http.post("", { title: chatsName });
  }
  public addUserToChat(data: addUsersData) {
    return this.http.put("/users", data);
  }
  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }
  delete = undefined;
  read = undefined;
  update = undefined;
}
