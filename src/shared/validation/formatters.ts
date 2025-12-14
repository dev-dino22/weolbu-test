/**
 * 전화번호를 하이픈(-)이 포함된 형식으로 포맷팅
 * @param value 포맷팅할 전화번호 (숫자 및 하이픈 포함 가능)
 * @returns 포맷팅된 전화번호 (예: 010-1234-5678)
 * @example
 * formatPhoneNumber('01012345678') // '010-1234-5678'
 * formatPhoneNumber('010-1234-5678') // '010-1234-5678'
 */
export function formatPhoneNumber(value: string): string {
  // 숫자만 추출
  const numbers = value.replace(/[^\d]/g, '');

  // 최대 11자리까지만 허용
  const limitedNumbers = numbers.slice(0, 11);

  // 길이에 따라 하이픈 삽입
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
