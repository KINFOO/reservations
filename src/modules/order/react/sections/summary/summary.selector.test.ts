import { GuestFactory } from '@ratatouille/modules/order/core/model/guest-factory';
import { MealFactory } from '@ratatouille/modules/order/core/model/meal-factory';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { TableFactory } from '@ratatouille/modules/order/core/model/table-factory';
import { selectSummary } from '@ratatouille/modules/order/react/sections/summary/summary.selector';
import { createTestState } from '@ratatouille/modules/testing/tests-environment';

describe('summary selector', () => {
  it('provides empty summary', () => {
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
    expect(selectSummary(state)).toEqual({
      table: { id: '', title: '' },
      guests: [],
    });
  });

  it('provides summary', () => {
    const meal = MealFactory.create({ id: 'main-1', title: 'Pizza', type: OrderingDomainModel.MealType.MAIN_COURSE });
    const table = TableFactory.create({ id: 'table-1', title: 'Near entrance' });
    const guest = GuestFactory.create({
      id: 'user-1',
      firstName: 'John',
      lastName: 'Doe',
      meals: { mainCourse: 'main-1' },
    });

    const regularState: OrderingDomainModel.State = {
      step: OrderingDomainModel.Step.GUESTS,
      reservationStatus: 'idle',
      availableTables: { status: 'idle', data: [table] },
      availableMeals: { status: 'idle', data: [meal] },
      form: {
        organizerId: 'user-1',
        tableId: 'table-1',
        guests: [guest],
      },
    };
    const state = createTestState({ ordering: regularState });
    expect(selectSummary(state)).toEqual({
      table: { id: 'table-1', title: 'Near entrance' },
      guests: [
        { id: 'user-1', name: 'John Doe', isOrganizer: true, meals: { mainCourse: { id: 'main-1', title: 'Pizza' } } },
      ],
    });
  });
});
