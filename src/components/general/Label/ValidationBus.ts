const validationObserver = {
  login: true,
  password: true,
  email: true,
  name: true,
  phone: true,
  displayName: true,
  secondname: true,
  repeatPassword: true,
  oldPassword: true,
  newPassword: true,
};
function isDisabledSubmit() {
  const submitBtn = document.getElementById("submit-btn") as Element;
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
  children: {
    validation: {
      setProps: (arg0: { isUnvalid: boolean; message: string }) => void;
    };
  };
}) {
  context.children.validation.setProps({
    isUnvalid: false,
    message: "",
  });
}
export function loginValidation(
  value: string,
  context: {
    children: {
      validation: {
        setProps: (arg0: { isUnvalid: boolean; message: string }) => void;
      };
    };
  }
) {
  const regularExp = new RegExp("^.*[^A-zА-яЁё].*$");
  const isNotCorrect = regularExp.test(value);
  if (value.length < 2) {
    validationObserver.login = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message: "Логин должен содержать больше одного символа",
    });
  } else if (isNotCorrect) {
    validationObserver.login = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message:
        "Логин должен содержать только буквы, цифры и спец сиволы недопустимы",
    });
  } else {
    validationObserver.login = true;
    isDisabledSubmit();
    hideErrorMessage(context);
  }
}
export function passwordValidation(
  value: string,
  context: {
    children: {
      validation: {
        setProps: (arg0: { isUnvalid: boolean; message: string }) => void;
      };
    };
  }
) {
  if (value.length < 8) {
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
  context: {
    children: {
      validation: {
        setProps: (arg0: { isUnvalid: boolean; message: string }) => void;
      };
    };
  }
) {
  if (value.length < 8) {
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
  context: {
    children: {
      validation: {
        setProps: (arg0: { isUnvalid: boolean; message: string }) => void;
      };
    };
  }
) {
  if (value.length < 8) {
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
  context: {
    children: {
      validation: {
        setProps: (arg0: { isUnvalid: boolean; message: string }) => void;
      };
    };
  }
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
export function phoneValidation(
  value: string,
  context: {
    children: {
      validation: {
        setProps: (arg0: { isUnvalid: boolean; message: string }) => void;
      };
    };
  }
) {
  const regularExp =
    /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  const isCorrectPhone = regularExp.test(value);
  if (!isCorrectPhone) {
    validationObserver.phone = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message: "Телфон должен соответствовать формату 8/+7 xxx xxx xxxx",
    });
  } else {
    validationObserver.phone = true;
    isDisabledSubmit();
    hideErrorMessage(context);
  }
}
export function nameValidation(
  value: string,
  context: {
    children: {
      validation: {
        setProps: (arg0: { isUnvalid: boolean; message: string }) => void;
      };
    };
  }
) {
  const regularExp = new RegExp("^.*[^A-zА-яЁё].*$");
  const isNotCorrect = regularExp.test(value);
  if (value.length < 2) {
    validationObserver.name = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message: "Имя должно содержать больше одного символа",
    });
  } else if (isNotCorrect) {
    validationObserver.login = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message:
        "Имя должно содержать только буквы, цифры и спец сиволы недопустимы",
    });
  } else {
    validationObserver.name = true;
    isDisabledSubmit();
    hideErrorMessage(context);
  }
}
export function displayNameValidation(
  value: string,
  context: {
    children: {
      validation: {
        setProps: (arg0: { isUnvalid: boolean; message: string }) => void;
      };
    };
  }
) {
  const regularExp = new RegExp("^.*[^A-zА-яЁё].*$");
  const isNotCorrect = regularExp.test(value);
  if (value.length < 2) {
    validationObserver.displayName = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message: "Имя должно содержать больше одного символа",
    });
  } else if (isNotCorrect) {
    validationObserver.login = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message:
        "Имя должно содержать только буквы, цифры и спец сиволы недопустимы",
    });
  } else {
    validationObserver.displayName = true;
    isDisabledSubmit();
    hideErrorMessage(context);
  }
}
export function secondnameValidation(
  value: string,
  context: {
    children: {
      validation: {
        setProps: (arg0: { isUnvalid: boolean; message: string }) => void;
      };
    };
  }
) {
  const regularExp = new RegExp("^.*[^A-zА-яЁё].*$");
  const isNotCorrect = regularExp.test(value);
  if (value.length < 2) {
    validationObserver.secondname = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message: "Фамилия должна содержать больше одного символа",
    });
  } else if (isNotCorrect) {
    validationObserver.login = false;
    isDisabledSubmit();
    context.children.validation.setProps({
      isUnvalid: true,
      message:
        "Фамилия должна содержать только буквы, цифры и спец сиволы недопустимы",
    });
  } else {
    validationObserver.secondname = true;
    isDisabledSubmit();
    hideErrorMessage(context);
  }
}
export function repeatPasswordValidation(
  value: string,
  context: {
    children: {
      validation: {
        setProps: (arg0: { isUnvalid: boolean; message: string }) => void;
      };
    };
  }
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
