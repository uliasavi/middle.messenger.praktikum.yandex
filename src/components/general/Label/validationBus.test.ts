import { expect } from "chai";
import * as ValidationBus from "./ValidationBus";
import sinon from "sinon";

describe("ValidationBus", () => {
  describe("loginValidation", () => {
    let context: any;
    beforeEach(() => {
      context = {
        children: {
          validation: {
            setProps: sinon.fake(),
          },
        },
      };
    });
    it("should isNotCorrect=true on val<2", () => {
      // arrange
      const value = "q";
      // act
      ValidationBus.loginValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.login).to.eq(false);
    });
    it("should call SetProps with correct parametrs on val<2", () => {
      // arrange
      const value = "q";
      // act
      ValidationBus.loginValidation(value, context);
      // assert
      expect(
        context.children.validation.setProps.calledWith({
          isUnvalid: true,
          message: "Логин должен содержать больше одного символа",
        })
      ).to.eq(true);
    });
    it("should call SetProps with correct parametrs if value is not correct", () => {
      // arrange
      const value = "==q";
      // act
      ValidationBus.loginValidation(value, context);
      // assert
      expect(
        context.children.validation.setProps.calledWith({
          isUnvalid: true,
          message: "Логин должен содержать только буквы, цифры и спец сиволы недопустимы",
        })
      ).to.eq(true);
    });
    it("should set validationObserver.login=true if value is correct", () => {
      // arrange
      const value = "eee";
      // act
      ValidationBus.loginValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.login).to.eq(true);
    });
  });
  describe("passwordValidation", () => {
    let context: any;
    beforeEach(() => {
      context = {
        children: {
          validation: {
            setProps: sinon.fake(),
          },
        },
      };
    });
    it("should call SetProps with correct parametrs if value is shotter than 8 symbols ", () => {
      // arrange
      const value = "111";
      // act
      ValidationBus.passwordValidation(value, context);
      // assert
      expect(
        context.children.validation.setProps.calledWith({
          isUnvalid: true,
          message: "Пароль должен содержать не менее 8 символов",
        })
      ).to.eq(true);
    });
    it("should set validationObserver.password=false if value is shotter than 8 symbols ", () => {
      // arrange
      const value = "111";
      // act
      ValidationBus.passwordValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.password).to.eq(false);
    });
    it("should set validationObserver.password=true if value >=8 symbols ", () => {
      // arrange
      const value = "11111111";
      // act
      ValidationBus.passwordValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.password).to.eq(true);
    });
  });
  describe("oldPasswordValidation", () => {
    let context: any;
    beforeEach(() => {
      context = {
        children: {
          validation: {
            setProps: sinon.fake(),
          },
        },
      };
    });
    it("should call SetProps with correct parametrs if value is shotter than 8 symbols ", () => {
      // arrange
      const value = "111";
      // act
      ValidationBus.oldPasswordValidation(value, context);
      // assert
      expect(
        context.children.validation.setProps.calledWith({
          isUnvalid: true,
          message: "Пароль должен содержать не менее 8 символов",
        })
      ).to.eq(true);
    });
    it("should set validationObserver.oldPassword=false if value is shotter than 8 symbols ", () => {
      // arrange
      const value = "111";
      // act
      ValidationBus.oldPasswordValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.oldPassword).to.eq(false);
    });
    it("should set validationObserver.oldPassword=true if value >=8 symbols ", () => {
      // arrange
      const value = "11111111";
      // act
      ValidationBus.oldPasswordValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.oldPassword).to.eq(true);
    });
  });
  describe("newPasswordValidation", () => {
    let context: any;
    beforeEach(() => {
      context = {
        children: {
          validation: {
            setProps: sinon.fake(),
          },
        },
      };
    });
    it("should call SetProps with correct parametrs if value is shotter than 8 symbols ", () => {
      // arrange
      const value = "111";
      // act
      ValidationBus.newPasswordValidation(value, context);
      // assert
      expect(
        context.children.validation.setProps.calledWith({
          isUnvalid: true,
          message: "Пароль должен содержать не менее 8 символов",
        })
      ).to.eq(true);
    });
    it("should set validationObserver.newPassword=false if value is shotter than 8 symbols ", () => {
      // arrange
      const value = "111";
      // act
      ValidationBus.newPasswordValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.newPassword).to.eq(false);
    });
    it("should set validationObserver.newPassword=true if value >=8 symbols ", () => {
      // arrange
      const value = "11111111";
      // act
      ValidationBus.newPasswordValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.newPassword).to.eq(true);
    });
  });
  describe("emailValidation", () => {
    let context: any;
    beforeEach(() => {
      context = {
        children: {
          validation: {
            setProps: sinon.fake(),
          },
        },
      };
    });
    it("should call Setprops with rigth parametrs if email is not correct", () => {
      // arrange
      const value = "111";
      // act
      ValidationBus.emailValidation(value, context);
      // assert
      expect(
        context.children.validation.setProps.calledWith({
          isUnvalid: true,
          message: "Email введен не корректно",
        })
      ).to.eq(true);
    });
    it("should set validationObserver.email=false if email is not correct", () => {
      // arrange
      const value = "111";
      // act
      ValidationBus.emailValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.email).to.eq(false);
    });
    it("should set validationObserver.email=true if email is correct", () => {
      // arrange
      const value = "julia@mail.ru";
      // act
      ValidationBus.emailValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.email).to.eq(true);
    });
  });
  describe("phoneValidation", () => {
    let context: any;
    beforeEach(() => {
      context = {
        children: {
          validation: {
            setProps: sinon.fake(),
          },
        },
      };
    });
    it("should call Setprops with rigth parametrs if phone is not correct", () => {
      // arrange
      const value = "111";
      // act
      ValidationBus.phoneValidation(value, context);
      // assert
      expect(
        context.children.validation.setProps.calledWith({
          isUnvalid: true,
          message: "Телфон должен соответствовать формату 8/+7 xxx xxx xxxx",
        })
      ).to.eq(true);
    });
    it("should set validationObserver.phone=false if phone is not correct", () => {
      // arrange
      const value = "111";
      // act
      ValidationBus.phoneValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.phone).to.eq(false);
    });
    it("should set validationObserver.phone=true if phone is correct", () => {
      // arrange
      const value = "+79773003030";
      // act
      ValidationBus.phoneValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.phone).to.eq(true);
    });
  });
  describe("nameValidation", () => {
    let context: any;
    beforeEach(() => {
      context = {
        children: {
          validation: {
            setProps: sinon.fake(),
          },
        },
      };
    });
    it("should set validationObserver.name=false on val<2", () => {
      // arrange
      const value = "q";
      // act
      ValidationBus.nameValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.name).to.eq(false);
    });
    it("should call SetProps with correct parametrs on val<2", () => {
      // arrange
      const value = "q";
      // act
      ValidationBus.nameValidation(value, context);
      // assert
      expect(
        context.children.validation.setProps.calledWith({
          isUnvalid: true,
          message: "Имя должно содержать больше одного символа",
        })
      ).to.eq(true);
    });
    it("should call SetProps with correct parametrs if value is not correct", () => {
      // arrange
      const value = "==q";
      // act
      ValidationBus.nameValidation(value, context);
      // assert
      expect(
        context.children.validation.setProps.calledWith({
          isUnvalid: true,
          message: "Имя должно содержать только буквы, цифры и спец сиволы недопустимы",
        })
      ).to.eq(true);
    });
    it("should set validationObserver.name=true if value is correct", () => {
      // arrange
      const value = "eee";
      // act
      ValidationBus.nameValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.name).to.eq(true);
    });
  });
  describe("displayNameValidation", () => {
    let context: any;
    beforeEach(() => {
      context = {
        children: {
          validation: {
            setProps: sinon.fake(),
          },
        },
      };
    });
    it("should set validationObserver.displayName=false on val<2", () => {
      // arrange
      const value = "q";
      // act
      ValidationBus.displayNameValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.displayName).to.eq(false);
    });
    it("should call SetProps with correct parametrs on val<2", () => {
      // arrange
      const value = "q";
      // act
      ValidationBus.displayNameValidation(value, context);
      // assert
      expect(
        context.children.validation.setProps.calledWith({
          isUnvalid: true,
          message: "Имя должно содержать больше одного символа",
        })
      ).to.eq(true);
    });
    it("should call SetProps with correct parametrs if value is not correct", () => {
      // arrange
      const value = "==q";
      // act
      ValidationBus.displayNameValidation(value, context);
      // assert
      expect(
        context.children.validation.setProps.calledWith({
          isUnvalid: true,
          message: "Имя должно содержать только буквы, цифры и спец сиволы недопустимы",
        })
      ).to.eq(true);
    });
    it("should set validationObserver.displayName=true if value is correct", () => {
      // arrange
      const value = "eee";
      // act
      ValidationBus.displayNameValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.displayName).to.eq(true);
    });
  });
  describe("secondnameValidation", () => {
    let context: any;
    beforeEach(() => {
      context = {
        children: {
          validation: {
            setProps: sinon.fake(),
          },
        },
      };
    });
    it("should set validationObserver.secondname=false on val<2", () => {
      // arrange
      const value = "q";
      // act
      ValidationBus.secondnameValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.secondname).to.eq(false);
    });
    it("should call SetProps with correct parametrs on val<2", () => {
      // arrange
      const value = "q";
      // act
      ValidationBus.secondnameValidation(value, context);
      // assert
      expect(
        context.children.validation.setProps.calledWith({
          isUnvalid: true,
          message: "Фамилия должна содержать больше одного символа",
        })
      ).to.eq(true);
    });
    it("should call SetProps with correct parametrs if value is not correct", () => {
      // arrange
      const value = "==q";
      // act
      ValidationBus.secondnameValidation(value, context);
      // assert
      expect(
        context.children.validation.setProps.calledWith({
          isUnvalid: true,
          message: "Фамилия должна содержать только буквы, цифры и спец сиволы недопустимы",
        })
      ).to.eq(true);
    });
    it("should set validationObserver.secondname=true if value is correct", () => {
      // arrange
      const value = "eee";
      // act
      ValidationBus.secondnameValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.secondname).to.eq(true);
    });
  });
  describe("repeatPasswordValidation", () => {
    let context: any;
    beforeEach(() => {
      context = {
        children: {
          validation: {
            setProps: sinon.fake(),
          },
        },
      };
    });
    it("should call SetProps with correct parametrs if value is empty", () => {
      // arrange
      const value = "";
      // act
      ValidationBus.repeatPasswordValidation(value, context);
      // assert
      expect(
        context.children.validation.setProps.calledWith({
          isUnvalid: true,
          message: "Повторите пароль",
        })
      ).to.eq(true);
    });
    it("should set validationObserver.repeatPassword=false if value is shotter than 8 symbols ", () => {
      // arrange
      const value = "111";
      // act
      ValidationBus.repeatPasswordValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.repeatPassword).to.eq(false);
    });
    it("should call SetProps with correct parametrs if value and old value is not equal", () => {
      // arrange
      const value = "22222222";
      // act
      ValidationBus.repeatPasswordValidation(value, context);
      // assert
      expect(
        context.children.validation.setProps.calledWith({
          isUnvalid: true,
          message: "Пароли должны совпадать",
        })
      ).to.eq(true);
    });
    it("should set validationObserver.password=true if old and new value is equal", () => {
      // arrange
      const value = "11111111";
      // act
      ValidationBus.repeatPasswordValidation(value, context);
      const observer = ValidationBus.validationObserver;
      // assert
      expect(observer.repeatPassword).to.eq(true);
    });
  });
});
