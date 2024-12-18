import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { selectForm } from '@ratatouille/modules/order/core/selectors/form.selector';
import { createTestState } from '@ratatouille/modules/testing/tests-environment';

const orderingState: OrderingDomainModel.State = {
  availableTables: { status: 'idle', data: [] },
  availableMeals: { status: 'idle', data: [] },
  step: OrderingDomainModel.Step.GUESTS,
  reservationStatus: 'idle',
  form: {
    guests: [],
  },
};

it('provides step', () => {
  const state = createTestState({ ordering: orderingState });
  expect(selectForm(state)).toEqual({ guests: [] });
});
