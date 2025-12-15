export const formatter = {
  toPhoneNumber,
  toPrice,
  toDate,
};

function toPhoneNumber(value: string): string {
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

function toPrice(price: number): string {
  return price.toLocaleString('ko-KR');
}

function toDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
