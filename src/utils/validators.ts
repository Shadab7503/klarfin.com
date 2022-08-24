export const validateNotEmpty = (str: string) => {
  return str.length > 0;
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePAN = (pan: string) => {
  const regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  return regpan.test(pan);
};

export const validateMobile = (mobile: string) => {
  const regmobile = /^[6-9]\d{9}$/;
  return regmobile.test(mobile);
};

export const validatePassword = (str: string) => {
  return str.length >= 8 && /\d/.test(str) && /[a-zA-Z]/.test(str);
};
