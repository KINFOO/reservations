import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

export class GuestFactory {
  static create({
    id = '',
    firstName = '',
    lastName = '',
    age = 24,
  }: Partial<OrderingDomainModel.Guest>): OrderingDomainModel.Guest {
    return {
      id,
      firstName,
      lastName,
      age,
    };
  }
}
