import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { AppState } from '@ratatouille/modules/store/store';

export const selectSummary = (state: AppState): OrderingDomainModel.Summary => {
  const selectedTable = state.ordering.availableTables.data.find((table) => table.id === state.ordering.form.tableId);
  const table = { id: state.ordering.form.tableId ?? '', title: selectedTable?.title ?? '' };

  const meals = new Map<string, OrderingDomainModel.MealSummary>(
    state.ordering.availableMeals.data.map(({ id, title }) => [id, { id, title }])
  );

  const guests = state.ordering.form.guests.map((guest) => {
    return {
      id: guest.id,
      name: `${guest.firstName} ${guest.lastName}`,
      isOrganizer: guest.id === state.ordering.form.organizerId,
      meals: {
        starter: guest.meals.starter ? meals.get(guest.meals.starter) : undefined,
        mainCourse: meals.get(guest.meals.mainCourse!)!,
        dessert: guest.meals.dessert ? meals.get(guest.meals.dessert) : undefined,
        drink: guest.meals.drink ? meals.get(guest.meals.drink) : undefined,
      },
    };
  });
  return { table, guests };
};
