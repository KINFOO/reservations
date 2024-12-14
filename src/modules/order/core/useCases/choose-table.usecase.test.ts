import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { chooseTable } from '@ratatouille/modules/order/core/useCases/choose-table.usecase';
import { createTestStore } from '@ratatouille/modules/testing/tests-environment';

describe('Choose table', () => {
  it('should choose table', () => {
    const store = createTestStore();

    store.dispatch(chooseTable('1'));

    expect(store.getState().ordering.form.tableId).toBe('1');
    expect(store.getState().ordering.step).toBe(OrderingDomainModel.Step.MEALS);
  });
});
