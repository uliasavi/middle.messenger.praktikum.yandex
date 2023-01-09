import { expect } from "chai";
import sinon from "sinon";
import { Link } from ".";
import Router from "../../../utils/Router";

describe("Link", () => {
  const originalGo = Router.go;
  Router.go = sinon.fake();
  after(() => {
    Router.go = originalGo;
  });
  it("should call Router.go onclick", () => {
    // arrange
    const instance = new Link({
      label: "Войти",
      class: "nav-link",
      to: "/",
    });
    const element = instance.element;
    // act
    element?.click();
    // assert
    expect((Router.go as any).callCount).to.eq(1);
  });
});
