import { describe, it, expect } from 'vitest';
import { deepEqual, equalByKeys } from './deepEqual';

describe('deepEqual', () => {
  describe('primitive values', () => {
    it('같은 숫자는 true를 반환한다', () => {
      expect(deepEqual(1, 1)).toBe(true);
      expect(deepEqual(0, 0)).toBe(true);
    });

    it('다른 숫자는 false를 반환한다', () => {
      expect(deepEqual(1, 2)).toBe(false);
    });

    it('같은 문자열은 true를 반환한다', () => {
      expect(deepEqual('hello', 'hello')).toBe(true);
    });

    it('다른 문자열은 false를 반환한다', () => {
      expect(deepEqual('hello', 'world')).toBe(false);
    });

    it('같은 boolean은 true를 반환한다', () => {
      expect(deepEqual(true, true)).toBe(true);
      expect(deepEqual(false, false)).toBe(true);
    });

    it('null과 undefined는 자기 자신과만 같다', () => {
      expect(deepEqual(null, null)).toBe(true);
      expect(deepEqual(undefined, undefined)).toBe(true);
      expect(deepEqual(null, undefined)).toBe(false);
    });
  });

  describe('arrays', () => {
    it('같은 배열은 true를 반환한다', () => {
      expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    });

    it('다른 배열은 false를 반환한다', () => {
      expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    it('길이가 다른 배열은 false를 반환한다', () => {
      expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
    });

    it('중첩된 배열도 비교한다', () => {
      expect(deepEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
      expect(deepEqual([1, [2, 3]], [1, [2, 4]])).toBe(false);
    });

    it('빈 배열은 true를 반환한다', () => {
      expect(deepEqual([], [])).toBe(true);
    });
  });

  describe('objects', () => {
    it('같은 객체는 true를 반환한다', () => {
      expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    });

    it('다른 값을 가진 객체는 false를 반환한다', () => {
      expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    });

    it('키가 다른 객체는 false를 반환한다', () => {
      expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    });

    it('중첩된 객체도 비교한다', () => {
      expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(
        true
      );
      expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })).toBe(
        false
      );
    });

    it('빈 객체는 true를 반환한다', () => {
      expect(deepEqual({}, {})).toBe(true);
    });
  });

  describe('mixed types', () => {
    it('배열과 객체를 섞어도 비교한다', () => {
      expect(
        deepEqual({ a: [1, 2], b: { c: 3 } }, { a: [1, 2], b: { c: 3 } })
      ).toBe(true);
      expect(
        deepEqual({ a: [1, 2], b: { c: 3 } }, { a: [1, 3], b: { c: 3 } })
      ).toBe(false);
    });

    it('타입이 다르면 false를 반환한다', () => {
      expect(deepEqual(1, '1')).toBe(false);
      expect(deepEqual([], {})).toBe(false);
      expect(deepEqual(null, {})).toBe(false);
    });
  });
});

describe('equalByKeys', () => {
  type TestObject = {
    id: number;
    name: string;
    age: number;
  };

  it('지정된 키의 값이 모두 같으면 true를 반환한다', () => {
    const obj1: TestObject = { id: 1, name: 'John', age: 30 };
    const obj2: TestObject = { id: 1, name: 'John', age: 25 };

    expect(equalByKeys(obj1, obj2, ['id', 'name'])).toBe(true);
  });

  it('지정된 키 중 하나라도 다르면 false를 반환한다', () => {
    const obj1: TestObject = { id: 1, name: 'John', age: 30 };
    const obj2: TestObject = { id: 1, name: 'Jane', age: 30 };

    expect(equalByKeys(obj1, obj2, ['id', 'name'])).toBe(false);
  });

  it('빈 키 배열이면 항상 true를 반환한다', () => {
    const obj1: TestObject = { id: 1, name: 'John', age: 30 };
    const obj2: TestObject = { id: 2, name: 'Jane', age: 25 };

    expect(equalByKeys(obj1, obj2, [])).toBe(true);
  });

  it('null과 undefined를 처리한다', () => {
    const obj: TestObject = { id: 1, name: 'John', age: 30 };

    expect(equalByKeys(null, null, ['id'])).toBe(true);
    expect(equalByKeys(undefined, undefined, ['id'])).toBe(true);
    expect(equalByKeys(obj, null, ['id'])).toBe(false);
    expect(equalByKeys(null, obj, ['id'])).toBe(false);
  });

  it('중첩된 객체 값도 비교한다', () => {
    type ComplexObject = {
      id: number;
      data: { value: string };
    };

    const obj1: ComplexObject = { id: 1, data: { value: 'test' } };
    const obj2: ComplexObject = { id: 1, data: { value: 'test' } };
    const obj3: ComplexObject = { id: 1, data: { value: 'other' } };

    expect(equalByKeys(obj1, obj2, ['id', 'data'])).toBe(true);
    expect(equalByKeys(obj1, obj3, ['id', 'data'])).toBe(false);
  });
});
