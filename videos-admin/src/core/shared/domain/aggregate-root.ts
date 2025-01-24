import { Entity } from './entity';
import { EventEmitter2 } from 'eventemitter2';
import { IDomainEvent } from './events/domain-event.interface';

export abstract class AggregateRoot extends Entity {
  events: Set<IDomainEvent> = new Set<IDomainEvent>();
  dispatchedEvents: Set<IDomainEvent> = new Set<IDomainEvent>();
  localMediator = new EventEmitter2({
    // set this to `true` to use wildcards
    wildcard: false,

    // the delimiter used to segment namespaces
    delimiter: '.',

    // set this to `true` if you want to emit the newListener event
    newListener: false,

    // set this to `true` if you want to emit the removeListener event
    removeListener: false,

    // the maximum amount of listeners that can be assigned to an event
    maxListeners: 10,

    // show event name in memory leak message when more than maximum amount of listeners is assigned
    verboseMemoryLeak: false,

    // disable throwing uncaughtException if an error event is emitted and it has no listeners
    ignoreErrors: false,
  });
  //vai disparar somente o evento dentro do próprio aggregate
  applyEvent(event: IDomainEvent) {
    this.events.add(event);
    this.localMediator.emit(event.constructor.name, event);
  }

  registerHandler(event: string, handler: (event: IDomainEvent) => void) {
    this.localMediator.on(event, handler);
  }

  markEventAsDispatched(event: IDomainEvent) {
    this.dispatchedEvents.add(event);
  }

  getUncommittedEvents(): IDomainEvent[] {
    return Array.from(this.events).filter(
      (event) => !this.dispatchedEvents.has(event),
    );
  }

  clearEvents() {
    this.events.clear();
    this.dispatchedEvents.clear();
  }
}
