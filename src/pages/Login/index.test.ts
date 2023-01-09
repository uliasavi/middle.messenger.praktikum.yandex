import { expect } from "chai";
import proxyquire from "proxyquire";
import sinon from "sinon";

describe("Login page", () => {
  const signinFake = sinon.fake();
  const { LoginPage } = proxyquire("./index", {
    "../../controllers/AuthController": { signin: signinFake, "@noCallThru": true },
  });
  it("should call AuthController if called onSubmit", () => {
    // arrange
    const page = new LoginPage();
    const target = window.document.createElement("form");
    const eventSpy = {
      type: "submit",
      target: target,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      preventDefault: function () {},
    };
    // act
    page.onSubmit(eventSpy);
    // assert
    expect(signinFake.callCount).to.eq(1);
  });
});
