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

  changeOrganizer(form: OrderingDomainModel.Form, id: string) {
    if (form.guests.some((guest) => guest.id === id)) {
      return { ...form, organizerId: id };
    }
    return form;
  }

  isSubmittable({ organizerId }: OrderingDomainModel.Form) {
    return typeof organizerId === 'string';
  }

  updateGuest<T extends keyof OrderingDomainModel.Guest>(
    form: OrderingDomainModel.Form,
    id: string,
    key: T,
    value: OrderingDomainModel.Guest[T]
  ) {
    return { ...form, guests: form.guests.map((guest) => (guest.id === id ? { ...guest, [key]: value } : guest)) };
  }
}
