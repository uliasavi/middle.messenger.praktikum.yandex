import Block from "./Block";

describe("Block", () => {
  class Component extends Block {
    protected render(): DocumentFragment {
      return new DocumentFragment();
    }
  }
  it("test", () => {
    // arrange
    const instance = new Component({});
    
    // act

    // assert
  });
});
