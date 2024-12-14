import { TableFactory } from '@ratatouille/modules/order/core/model/table-factory';
import { fetchTables } from '@ratatouille/modules/order/core/useCases/fetch-table.usecase';
import { createTestStore } from '@ratatouille/modules/testing/tests-environment';

describe('Fetch table use case', () => {
  it('should fetch table', async () => {
    const listOfTables = [TableFactory.create({ id: '1' })];
    const store = createTestStore({
      dependencies: { tableGateway: { getTables: () => Promise.resolve(listOfTables) } },
    });

    const promise = store.dispatch(fetchTables);

    expect(store.getState().ordering.avialableTables.status).toBe('loading');

    await promise;

    expect(store.getState().ordering.avialableTables.data).toEqual(listOfTables);
    expect(store.getState().ordering.avialableTables.status).toBe('success');
  });

  it('should handle fetch table error', async () => {
    const store = createTestStore({
      dependencies: { tableGateway: { getTables: () => Promise.reject(new Error('Unable to fetch tables')) } },
    });

    await store.dispatch(fetchTables);

    expect(store.getState().ordering.avialableTables.status).toBe('error');
    expect(store.getState().ordering.avialableTables.data).toEqual([]);
  });
});
