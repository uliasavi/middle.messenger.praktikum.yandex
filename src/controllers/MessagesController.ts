import store from "../utils/Store";
import { WSTransportEvents, WSTransport } from "../utils/WSTransport";
import ChatsController from "./ChatsController";

export interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }
}

class MessagesController {
  private transports: Map<number, WSTransport> = new Map();

  async connect(chatId: number) {
    if (this.transports.has(chatId)) {
      return;
    }
    const token = await ChatsController.getToken(chatId);
    const userId = store.getState().user?.id;

    const transport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );
    this.transports.set(chatId, transport);

    await transport.connect();

    this.subscribe(transport, chatId);

    this.fetchOldMessages(chatId);
  }

  private subscribe(transport: WSTransport, id: number) {
    transport.on(WSTransportEvents.Message, (message) =>
      this.receivedMessage(id, message)
    );
    transport.on(WSTransportEvents.Close, () => this.onClose(id));
  }
  private onClose(id: number) {
    this.transports.delete(id);
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
    const transport = this.transports.get(chatId);
    if (!transport) {
      throw new Error("Connection isn't available");
    }
    transport.send({
      type: "get old",
      content: "0",
    });
  }

  sendMessage(chatId: number, content: string) {
    const transport = this.transports.get(chatId);
    if (!transport) {
      throw new Error("Connection isn't available");
    }
    transport.send({
      type: "message",
      content,
    });
  }

  closeAll() {
    Array.from(this.transports.values()).forEach((transports) =>
      transports.close()
    );
  }
}

const messagesController = new MessagesController();

export default messagesController;
