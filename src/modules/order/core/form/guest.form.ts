import { IIDProvider } from '@ratatouille/core/id-provider';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

export class GuestForm {
  constructor(private idProvider: IIDProvider) {}

  addGuest({ guests, organizerId }: OrderingDomainModel.Form) {
    const id = this.idProvider.generate();
    return { organizerId, guests: [...guests, { id, firstName: 'John', lastName: 'Doe', age: 0 }] };
  }

  removeGuest({ guests, organizerId }: OrderingDomainModel.Form, id: string) {
    return { organizerId, guests: guests.filter((guest) => guest.id !== id) };
  }
}
