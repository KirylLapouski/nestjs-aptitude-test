import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { Profile } from './profile.entity';
import { Observable, Subject, Subscriber } from 'rxjs';

@EventSubscriber()
export class ProfileSubscriber implements EntitySubscriberInterface<Profile> {
  subscriber: Subscriber<Profile>[] = [];

  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Profile;
  }

  beforeInsert(event: InsertEvent<Profile>) {
    this.subscriber.map(v => v.next(event.entity));
  }

  beforeUpdate(event: UpdateEvent<Profile>): Promise<any> | void {
    this.subscriber.map(v => v.next(event.entity));
  }

  addSubscriber(subs: Subscriber<Profile>) {
    this.subscriber.push(subs);
  }
}
