import { GuestFactory } from '@ratatouille/modules/order/core/model/guest-factory';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { orderingActions } from '@ratatouille/modules/order/core/store/ordering.slice';
import { createTestStore } from '@ratatouille/modules/testing/tests-environment';

describe('Choose guests use case', () => {
  it('should choose guests', () => {
    const store = createTestStore();
    const form: OrderingDomainModel.Form = {
      guests: [GuestFactory.create({ id: '1' })],
    };

    store.dispatch(orderingActions.chooseGuests(form));

    expect(store.getState().ordering.form).toEqual(form);
    expect(store.getState().ordering.step).toBe(OrderingDomainModel.Step.TABLE);
  });
});
