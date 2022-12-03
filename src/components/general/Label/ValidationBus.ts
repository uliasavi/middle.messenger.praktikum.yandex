const validationObserver = {
  login: true,
  password: true,
  email: true,
  name: true,
  displayName: true,
  secondname: true,
  repeatPassword: true,
  oldPassword: true,
  newPassword: true,
};
function isDisabledSubmit() {
  const submitBtn = document.getElementById("submitBtn") as Element;
  for (const key in validationObserver) {
    if (Object.prototype.hasOwnProperty.call(validationObserver, key)) {
      const element: boolean = validationObserver[key];
      submitBtn.disabled = false;
      if (!element) {
        submitBtn.disabled = true;
        break;
      }
    }
  }
}
function hideErrorMessage(context: {
  children: { validation: { setProps: (arg0: { isUnvalid: boolean; message: string }) => void } };
}) {
  context.children.validation.setProps({
    isUnvalid: false,
    message: "",
  });
}
export function loginValidation(
  value: string,
  context: { children: { validation: { setProps: (arg0: { isUnvalid: boolean; message: string }) => void } } }
) {
  if (value.length < 2) {
    validationObserver.login = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message: "Логин должен содержать больше одного символа",
    });
  } else {
    validationObserver.login = true;
    isDisabledSubmit();
    hideErrorMessage(context);
  }
}
export function passwordValidation(
  value: string,
  context: { children: { validation: { setProps: (arg0: { isUnvalid: boolean; message: string }) => void } } }
) {
  if (value.length < 9) {
    validationObserver.password = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message: "Пароль должен содержать не менее 8 символов",
    });
  } else {
    validationObserver.password = true;
    isDisabledSubmit();
    hideErrorMessage(context);
  }
}
export function oldPasswordValidation(
  value: string,
  context: { children: { validation: { setProps: (arg0: { isUnvalid: boolean; message: string }) => void } } }
) {
  if (value.length < 9) {
    validationObserver.oldPassword = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message: "Пароль должен содержать не менее 8 символов",
    });
  } else {
    validationObserver.oldPassword = true;
    isDisabledSubmit();
    hideErrorMessage(context);
  }
}
export function newPasswordValidation(
  value: string,
  context: { children: { validation: { setProps: (arg0: { isUnvalid: boolean; message: string }) => void } } }
) {
  if (value.length < 9) {
    validationObserver.newPassword = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message: "Пароль должен содержать не менее 8 символов",
    });
  } else {
    validationObserver.newPassword = true;
    isDisabledSubmit();
    hideErrorMessage(context);
  }
}
export function emailValidation(
  value: string,
  context: { children: { validation: { setProps: (arg0: { isUnvalid: boolean; message: string }) => void } } }
) {
  const regularExp = /\S+@\S+\.\S+/;
  const isCorrectEmail = regularExp.test(value);
  if (!isCorrectEmail) {
    validationObserver.email = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message: "Email введен не корректно",
    });
  } else {
    validationObserver.email = true;
    isDisabledSubmit();
    hideErrorMessage(context);
  }
}
export function nameValidation(
  value: string,
  context: { children: { validation: { setProps: (arg0: { isUnvalid: boolean; message: string }) => void } } }
) {
  if (value.length < 2) {
    validationObserver.name = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message: "Имя должно содержать больше одного символа",
    });
  } else {
    validationObserver.name = true;
    isDisabledSubmit();
    hideErrorMessage(context);
  }
}
export function displayNameValidation(
    value: string,
    context: { children: { validation: { setProps: (arg0: { isUnvalid: boolean; message: string }) => void } } }
  ) {
    if (value.length < 2) {
      validationObserver.displayName = false;
      isDisabledSubmit();
      context.children.validation.setProps({
        isUnvalid: true,
        message: "Имя должно содержать больше одного символа",
      });
    } else {
      validationObserver.displayName = true;
      isDisabledSubmit();
      hideErrorMessage(context);
    }
  }
export function secondnameValidation(
  value: string,
  context: { children: { validation: { setProps: (arg0: { isUnvalid: boolean; message: string }) => void } } }
) {
  if (value.length < 2) {
    validationObserver.secondname = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message: "Фамилия должна содержать больше одного символа",
    });
  } else {
    validationObserver.secondname = true;
    isDisabledSubmit();
    hideErrorMessage(context);
  }
}
export function repeatPasswordValidation(
  value: string,
  context: { children: { validation: { setProps: (arg0: { isUnvalid: boolean; message: string }) => void } } }
) {
  const firstInputPassword = document.getElementById("password") as Element;
  const firstPassword: string = firstInputPassword.value;
  if (!value) {
    validationObserver.repeatPassword = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message: "Повторите пароль",
    });
  } else if (value !== firstPassword) {
    validationObserver.repeatPassword = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message: "Пароли должны совпадать",
    });
  } else {
    validationObserver.repeatPassword = true;
    isDisabledSubmit();
    hideErrorMessage(context);
  }
}
