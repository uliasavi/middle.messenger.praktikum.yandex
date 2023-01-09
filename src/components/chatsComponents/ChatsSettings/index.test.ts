import { expect } from "chai";
import { ChatSettings } from "./index";

describe("ChatSettings", () => {
  describe("addFriendAction", () => {
    let instance: any;
    beforeEach(() => {
      instance = new ChatSettings({
        chatId: 1,
        openModal: false,
        showAddBtn: true,
      });
    });
    it("should change props.showAddBtn if call addFriendAction", () => {
      // arrange
      // act
      instance.addFriendAction();
      // assert
      expect(instance.props.showAddBtn).to.eq(false);
    });
    it("should change child.props.class if call addFriendAction", () => {
      // arrange
      // act
      instance.addFriendAction();
      // assert
      expect(instance.children.addModal.props.class).to.eq("");
    });
  });
});
