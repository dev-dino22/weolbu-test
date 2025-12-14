export const formatters = {
  phoneNumber,
};

function phoneNumber(value: string): string {
  const numbers = value.replace(/[^\d]/g, '');
  const limitedNumbers = numbers.slice(0, 11);

  if (limitedNumbers.length <= 3) {
    return limitedNumbers;
  } else if (limitedNumbers.length <= 7) {
    return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
  } else {
    return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(
      3,
      7
    )}-${limitedNumbers.slice(7)}`;
  }
}
