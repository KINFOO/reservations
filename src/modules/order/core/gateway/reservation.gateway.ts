import { ReservationDTO } from '@ratatouille/modules/order/core/gateway/reserve.dto';

export interface IReservationGateway {
  reserve(data?: ReservationDTO): Promise<void>;
}
