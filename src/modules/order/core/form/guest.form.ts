import { IIDProvider } from '@ratatouille/core/id-provider';
import { GuestFactory } from '@ratatouille/modules/order/core/model/guest-factory';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { produce } from 'immer';

export class GuestForm {
  constructor(private idProvider: IIDProvider) {}

  addGuest(state: OrderingDomainModel.Form) {
    return produce(state, (draft) => {
      const id = this.idProvider.generate();
      draft.guests.push(GuestFactory.create({ id, firstName: 'John', lastName: 'Doe', age: 24 }));
    });
  }

  removeGuest(state: OrderingDomainModel.Form, id: string) {
    return produce(state, (draft) => {
      const guestIndex = draft.guests.findIndex((guest) => guest.id === id);
      if (guestIndex !== -1) {
        const isOrganizer = draft.guests[guestIndex].id === draft.organizerId;
        draft.organizerId = isOrganizer ? undefined : draft.organizerId;
        draft.guests.splice(guestIndex, 1);
      }
      return;
    });
  }

  changeOrganizer(state: OrderingDomainModel.Form, id: string) {
    return produce(state, (draft) => {
      const organizerExists = draft.guests.some((guest) => guest.id === id);
      draft.organizerId = organizerExists ? id : undefined;
    });
  }

  isSubmittable({ organizerId, guests }: OrderingDomainModel.Form) {
    return (
      typeof organizerId === 'string' && guests.every((guest) => guest.firstName && guest.lastName && guest.age > 0)
    );
  }

  updateGuest<T extends keyof OrderingDomainModel.Guest>(
    state: OrderingDomainModel.Form,
    id: string,
    key: T,
    value: OrderingDomainModel.Guest[T]
  ) {
    return produce(state, (draft) => {
      const guestIndex = draft.guests.findIndex((guest) => guest.id === id);
      if (guestIndex > -1) {
        draft.guests[guestIndex][key] = value;
      }
    });
  }
}
