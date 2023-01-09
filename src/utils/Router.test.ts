import { expect } from "chai";
import sinon from "sinon";
import Router from "./Router";

describe("Router", () => {
  const originalForward = window.history.forward;
  const originalBack = window.history.back;

  beforeEach(() => {
    Router.reset();
    window.history.forward = sinon.fake();
    window.history.back = sinon.fake();
  });
  after(() => {
    window.history.forward = originalForward;
    window.history.back = originalBack;
  });
  it("forward", () => {
    // act
    Router.forward();

    // assert
    expect((window.history.forward as any).callCount).to.eq(1);
  });
  it("back", () => {
    // act
    Router.back();

    // assert
    expect((window.history.back as any).callCount).to.eq(1);
  });
});
