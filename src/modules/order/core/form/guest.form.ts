import { IIDProvider } from '@ratatouille/core/id-provider';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

export class GuestForm {
  constructor(private idProvider: IIDProvider) {}

  addGuest(state: OrderingDomainModel.Guest[]) {
    const id = this.idProvider.generate();
    return [...state, { id, firstName: 'John', lastName: 'Doe', age: 0 }];
  }

  removeGuest(state: OrderingDomainModel.Guest[], id: string) {
    return state.filter((guest) => guest.id !== id);
  }
}
