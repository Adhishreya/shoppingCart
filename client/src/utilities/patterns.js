export function isAlphanumeric(s) {
  return /^[a-zA-Z0-9]+$/.test(s);
}

export const alphanumericWithSpace = (s) => /^[a-zA-Z0-9 ]+$/.test(s);

export const alphanumericWithSpaceHash = (s) => /^[a-zA-Z0-9 #]+$/.test(s);

export const isNumeric = (s) => /^[0-9]+$/.test(s);

export const isAlpha = (s) => /^[a-zA-Z]+$/.test(s);

export const isAlphaWithSpace = (s) => /[a-zA-Z ]+$/.test(s);

export const trimSuccessiveSpace = (e, text) => {
  const len = text.length;
  if (e.key === " " && text[len - 1] === " ") {
    e.preventDefault();
  }
};

export const emailValid = (e) => {
  const email = /[a-zA-Z0-9_.]+@[a-zA-Z0-9].[a-zA-Z0-9-]{2,}/.test(e);
  return email;
};
