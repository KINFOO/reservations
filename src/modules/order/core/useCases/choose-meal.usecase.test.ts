import { GuestFactory } from '@ratatouille/modules/order/core/model/guest-factory';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { orderingActions } from '@ratatouille/modules/order/core/store/ordering.slice';
import { createTestStore } from '@ratatouille/modules/testing/tests-environment';

describe('Choose meal', () => {
  const form: OrderingDomainModel.Form = {
    guests: [GuestFactory.create({ id: '1', meals: { starter: '1' } })],
    organizerId: '1',
    tableId: '1',
  };
  it('should choose meal', () => {
    const store = createTestStore();
    store.dispatch(orderingActions.chooseMeal(form));

    expect(store.getState().ordering.form.guests).toEqual(form.guests);
    expect(store.getState().ordering.step).toBe(OrderingDomainModel.Step.SUMMARY);
  });
});
