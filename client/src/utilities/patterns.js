export function isAlphanumeric(s) {
  return /^[a-zA-Z0-9]+$/.test(s);
}

export const alphanumericWithSpace = (s) => /^[a-zA-Z0-9 ]+$/.test(s);

export const alphanumericWithSpaceHash = (s) => /^[a-zA-Z0-9 #]+$/.test(s);


export const isNumeric = (s) => /^[0-9]+$/.test(s);

export const isAlpha = (s) => /^[a-zA-Z]+$/.test(s);