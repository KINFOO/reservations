import { IReservationGateway } from '@ratatouille/modules/order/core/gateway/reservation.gateway';

export class InMemoryReservationGateway implements IReservationGateway {
  async reserve() {}
}
