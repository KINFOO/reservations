import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { TableFactory } from '@ratatouille/modules/order/core/model/table-factory';
import { selectTables } from '@ratatouille/modules/order/react/sections/table/table.selector';
import { createTestState } from '@ratatouille/modules/testing/tests-environment';

describe('Table selector', () => {
  it('provides no tables when state is empty', () => {
    const emptyState: OrderingDomainModel.State = {
      availableTables: { status: 'idle', data: [] },
      availableMeals: { status: 'idle', data: [] },
      step: OrderingDomainModel.Step.GUESTS,
      reservationStatus: 'idle',
      form: {
        guests: [],
      },
    };

    const state = createTestState({ ordering: emptyState });
    expect(selectTables(state)).toEqual([]);
  });

  it('provides tables', () => {
    const table = TableFactory.create({ id: 'table-1', title: 'Entrance', capacity: 5 });

    const simpleState: OrderingDomainModel.State = {
      availableTables: { status: 'idle', data: [table] },
      availableMeals: { status: 'idle', data: [] },
      step: OrderingDomainModel.Step.GUESTS,
      reservationStatus: 'idle',
      form: { guests: [] },
    };

    const state = createTestState({ ordering: simpleState });
    expect(selectTables(state)).toEqual([
      {
        id: 'table-1',
        title: 'Entrance',
        capacity: 5,
      },
    ]);
  });
});
