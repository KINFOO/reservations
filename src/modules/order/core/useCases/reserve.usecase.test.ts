import { GuestFactory } from '@ratatouille/modules/order/core/model/guest-factory';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { FailingReservationGateway } from '@ratatouille/modules/order/core/testing/failing-reservation-gateway';
import { MockReservationGateway } from '@ratatouille/modules/order/core/testing/mock-reservation-gateway';
import { reserve } from '@ratatouille/modules/order/core/useCases/reserve.usecase';
import { createTestStore } from '@ratatouille/modules/testing/tests-environment';

describe('Reserve', () => {
  const guest = GuestFactory.create({ id: '1', meals: { mainCourse: '1' } });
  const orderForm: OrderingDomainModel.Form = {
    guests: [guest],
    organizerId: '1',
    tableId: '1',
  };

  const orderingState: OrderingDomainModel.State = {
    form: orderForm,
    step: OrderingDomainModel.Step.SUMMARY,
    reservationStatus: 'idle',
    availableMeals: {
      data: [],
      status: 'idle',
    },
    availableTables: {
      data: [],
      status: 'idle',
    },
  };

  it('should reserve', async () => {
    const reservationGateway = new MockReservationGateway();

    const store = createTestStore({
      initialState: { ordering: orderingState },
      dependencies: { reservationGateway },
    });

    const promise = store.dispatch(reserve());
    expect(store.getState().ordering.reservationStatus).toBe('loading');
    await promise;

    expect(store.getState().ordering.reservationStatus).toBe('success');
    reservationGateway.expectReserveWasCalledWith({
      tableId: '1',
      guests: [
        {
          firstName: guest.firstName,
          lastName: guest.lastName,
          age: guest.age,
          isOrganizer: true,
          meals: {
            mainCourse: '1',
          },
        },
      ],
    });

    expect(store.getState().ordering.step).toBe(OrderingDomainModel.Step.RESERVED);
  });

  it('should handle failed reservation', async () => {
    const reservationGateway = new FailingReservationGateway();

    const store = createTestStore({
      initialState: { ordering: orderingState },
      dependencies: { reservationGateway },
    });

    const promise = store.dispatch(reserve());
    expect(store.getState().ordering.reservationStatus).toBe('loading');
    await promise;

    expect(store.getState().ordering.reservationStatus).toBe('error');
  });
});
