import store from "../utils/Store";
import { WSTransportEvents, WSTransport } from "../utils/WSTransport";
import ChatsController from "./ChatsController";

export interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
}

class MessagesController {
  private transports: Record<number, WSTransport> = {};

  async connect(chatId: number) {
    const token = await ChatsController.getToken(chatId);
    const userId = store.getState().user?.id;

    const transport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );
    await transport.connect();
    transport.on(
      WSTransportEvents.Message,
      this.receivedMessage.bind(this, chatId)
    );
    this.transports[chatId] = transport;

    this.fetchOldMessages(chatId);
  }

  receivedMessage(chatId: number, message: Message | Message[]) {
    let messagesToAdd: Message[] = [];

    if (Array.isArray(message)) {
      messagesToAdd = message.reverse();
    } else {
      messagesToAdd.push(message);
    }
    let currentMessages = (store.getState().messages || {})[chatId] || [];
    currentMessages = currentMessages.reverse();
    messagesToAdd = [...currentMessages, ...messagesToAdd];
    const stringChatId = chatId.toString();
    store.set(`messages.${stringChatId}`, messagesToAdd);
  }

  fetchOldMessages(chatId: number) {
    const transport = this.transports[chatId];
    if (!transport) {
      throw new Error("Connection isn't available");
    }
    transport.send({
      type: "get old",
      content: "0",
    });
  }

  sendMessage(chatId: number, content: string) {
    const transport = this.transports[chatId];
    if (!transport) {
      throw new Error("Connection isn't available");
    }
    transport.send({
      type: "message",
      content,
    });
  }
}

const messagesController = new MessagesController();

export default messagesController;
