import ChatsAPI from "../api/ChatsAPI";
import store from "../utils/Store";
import messagesController from "./MessagesController";

interface addUsersData {
  users: number[];
  chatId: number;
}
interface DialogMiniInterface {
  avatar: null;
  created_by: number;
  id: number;
  last_message: null;
  title: string;
  unread_count: number;
}

class ChatsController {
  private api = new ChatsAPI();

  async getAllChats() {
    try {
      const chats = await this.api.getAllChats();
      const promises = chats.map((chat: DialogMiniInterface) => {
        return messagesController.connect(chat.id);
      });
      await Promise.all(promises);
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
  getToken(id: number) {
    return this.api.getToken(id);
  }
}

export default new ChatsController();
