import { ValueObject } from "./value-objects";

export abstract class Entity {
    abstract get entiry_id() : ValueObject;
    abstract toJSON(): any;
}