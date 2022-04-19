export const toCurrency = (amount, currencyCode) => {
  if (typeof amount !== "number") {
    amount = parseFloat(amount);
  }

  const locale =
    navigator.languages != undefined
      ? navigator.languages[0]
      : navigator.language;

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  });

  return formatter.format(amount);
};

export const pluralize = (word, amount) => {
  return amount > 1 || amount == 0 ? `${word}s` : word;
};
