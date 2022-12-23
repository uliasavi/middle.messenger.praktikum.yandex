import ChatsAPI from "../api/ChatsAPI";
import store from "../utils/Store";

interface addUsersData {
  users: number[];
  chatId: number;
}

class ChatsController {
  private api = new ChatsAPI();

  async getAllChats() {
    try {
      const chats = await this.api.getAllChats();
      store.set("chats", chats);
    } catch (e) {
      console.error("getAllChats:", e);
    }
  }
  async createChat(chatsName: string) {
    try {
      await this.api.createChat(chatsName);
      this.getAllChats();
    } catch (e) {
      console.error("createChat:", chatsName, e);
    }
  }
  async addUserToChat(data: addUsersData) {
    try {
      await this.api.addUserToChat(data);
      this.getAllChats();
    } catch (e) {
      console.error("addUserToChat:", e);
    }
  }
}

export default new ChatsController();
