import { InvalidUuidError, Uuid } from "../uuid.vo";

describe('Uuid UJnit Tests', () => {

  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');

  it('should create a new Uuid instance', () => {
    const uuid = new Uuid();
    expect(uuid).toBeInstanceOf(Uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should create a new Uuid instance with a valid UUID', () => {
    const uuid = new Uuid();
    expect(uuid.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should create a new Uuid instance with a valid UUID', () => {
    const uuid = new Uuid('123e4567-e89b-12d3-a456-426614174000');
    expect(uuid.id).toBe('123e4567-e89b-12d3-a456-426614174000');
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should throw an error if the UUID is invalid', () => {
    expect(() => new Uuid('123e4567-e89b-12d3-a456-42661417400')).toThrow(
      InvalidUuidError
    );
    expect(validateSpy).toHaveBeenCalled();
  });
});