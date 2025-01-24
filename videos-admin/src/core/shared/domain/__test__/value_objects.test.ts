import { ValueObject } from '../value-objects';

class StringValueObject extends ValueObject {
  constructor(public value: string) {
    super();
  }
}

describe('ValueObject', () => {
  it('should return true if two value objects are equal', () => {
    const valueObject1 = new StringValueObject('test');
    const valueObject2 = new StringValueObject('test');

    expect(valueObject1.equals(valueObject2)).toBe(true);
  });

  it('should return false if two value objects are not equal', () => {
    const valueObject1 = new StringValueObject('test');
    const valueObject2 = new StringValueObject('test2');

    expect(valueObject1.equals(valueObject2)).toBe(false);
  });

  it('should return false if the value object is null', () => {
    const valueObject1 = new StringValueObject('test');
    const valueObject2: any = null;

    expect(valueObject1.equals(valueObject2 as any)).toBe(false);
  });

  it('should return false if the value object is undefined', () => {
    const valueObject1 = new StringValueObject('test');
    const valueObject2: any = undefined;

    expect(valueObject1.equals(valueObject2 as any)).toBe(false);
  });
});
