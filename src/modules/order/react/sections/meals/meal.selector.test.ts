import { MealFactory } from '@ratatouille/modules/order/core/model/meal-factory';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { selectMeals } from '@ratatouille/modules/order/react/sections/meals/meal.selector';
import { createTestState } from '@ratatouille/modules/testing/tests-environment';

describe('meal selector', () => {
  it('provides no meals when state is empty', () => {
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
    expect(selectMeals(state)).toEqual([]);
  });

  it('provides meals', () => {
    const meal = MealFactory.create({ id: 'main-1', title: 'Pizza', type: OrderingDomainModel.MealType.MAIN_COURSE });

    const simpleState: OrderingDomainModel.State = {
      availableTables: { status: 'idle', data: [] },
      availableMeals: { status: 'idle', data: [meal] },
      step: OrderingDomainModel.Step.GUESTS,
      reservationStatus: 'idle',
      form: { guests: [] },
    };

    const state = createTestState({ ordering: simpleState });
    expect(selectMeals(state)).toEqual([
      {
        id: 'main-1', //
        title: 'Pizza',
        type: OrderingDomainModel.MealType.MAIN_COURSE,
      },
    ]);
  });
});
