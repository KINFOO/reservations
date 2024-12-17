import { MealFactory } from '@ratatouille/modules/order/core/model/meal-factory';
import { FailingMealGateway } from '@ratatouille/modules/order/core/testing/failing-meal-gateway';
import { StubMealGateway } from '@ratatouille/modules/order/core/testing/stub-meal-gateway';
import { fetchMeals } from '@ratatouille/modules/order/core/useCases/fetch-meals.usecase';
import { createTestStore } from '@ratatouille/modules/testing/tests-environment';

describe('Fetch Meals use case', () => {
  it('should fetch Meals', async () => {
    const listOfMeals = [MealFactory.create()];
    const store = createTestStore({
      dependencies: { mealGateway: new StubMealGateway(listOfMeals) },
    });

    const promise = store.dispatch(fetchMeals);

    expect(store.getState().ordering.availableMeals.status).toBe('loading');

    await promise;

    expect(store.getState().ordering.availableMeals.data).toEqual(listOfMeals);
    expect(store.getState().ordering.availableMeals.status).toBe('success');
  });

  it('should handle fetch table error', async () => {
    const store = createTestStore({
      dependencies: { mealGateway: new FailingMealGateway() },
    });

    await store.dispatch(fetchMeals);

    expect(store.getState().ordering.availableMeals.status).toBe('error');
    expect(store.getState().ordering.availableMeals.data).toEqual([]);
  });
});
