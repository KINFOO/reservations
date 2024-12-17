import { IReservationGateway } from '@ratatouille/modules/order/core/gateway/reservation.gateway';
import { ReservationDTO } from '@ratatouille/modules/order/core/gateway/reserve.dto';

export class FailingReservationGateway implements IReservationGateway {
  async reserve(_?: ReservationDTO) {
    throw new Error('Unable to reserve');
  }
}
