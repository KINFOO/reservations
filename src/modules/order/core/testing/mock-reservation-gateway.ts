import { IReservationGateway } from '@ratatouille/modules/order/core/gateway/reservation.gateway';
import { ReservationDTO } from '@ratatouille/modules/order/core/gateway/reserve.dto';

export class MockReservationGateway implements IReservationGateway {
  private callData?: ReservationDTO;

  async reserve(data: ReservationDTO) {
    this.callData = data;
  }

  expectReserveWasCalledWith(data: ReservationDTO) {
    expect(this.callData).toEqual(data);
  }
}
