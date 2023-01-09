import { expect } from "chai";
import { merge, set } from "./helpers";

describe("helpers functions", () => {
  describe("set", () => {
    it("should return passed obj if it is not an object", () => {
      // arrange
      const obj = 3;

      // act
      const result = set(3, "test.test", 3);

      // assert
      expect(result).to.eq(obj);
    });
    it("should return null if it is null", () => {
      // arrange
      const obj = null;

      // act
      const result = set(obj, "test.test", 3);

      // assert
      expect(result).to.eq(obj);
    });
    it("should throw an error if path is not a string", () => {
      // arrange
      const obj = {};
      const path = 3 as any;

      // act
      const fn = () => set(obj, path, 3);

      // assert
      expect(fn).to.throw(Error);
    });
    it("should set new property to passed obj with passed value", () => {
      // arrange
      const obj = {};
      const path = "a.b.c";
      const value = 3;

      // act
      const result = set(obj, path, value);

      // assert
      expect((result as any).a.b.c).to.eq(value);
    });
    it("should snor return new obj", () => {
      // arrange
      const obj = {};
      const path = "a.b.c";
      const value = 3;

      // act
      const result = set(obj, path, value);

      // assert
      expect(result).to.eq(obj);
    });
  });
  describe("merge", () => {
    it("should return {} if all parametrs = {}", () => {
      // arrange
      const rhs = {};
      const lhs = {};

      // act
      const result = merge(lhs, rhs);

      // assert
      expect(result).to.be.an("object").that.is.empty;
    });
    it("should return old obj if new parametrs = {}", () => {
      // arrange
      const rhs = {};
      const lhs = { a: 1 };

      // act
      const result = merge(lhs, rhs);

      // assert
      expect(result).to.have.all.keys("a");
    });
    it("should return obj with old and new property", () => {
      // arrange
      const rhs = { b: 2 };
      const lhs = { a: 1 };

      // act
      const result = merge(lhs, rhs);

      // assert
      expect(result).to.have.all.keys("a", "b");
    });
    it("should return new value of property if property has equal name", () => {
      // arrange
      const rhs = { a: 2 };
      const lhs = { a: 1, b: 2 };

      // act
      const result = merge(lhs, rhs);

      // assert
      expect(result.a).to.eq(2);
    });
  });
});
