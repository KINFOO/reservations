import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { reserve } from '@ratatouille/modules/order/core/useCases/reserve.usecase';
import { AppState, useAppDispatch } from '@ratatouille/modules/store/store';
import { useSelector } from 'react-redux';

type MealSummary = {
  id: string;
  title: string;
};

type Summary = {
  table: { id: string; title: string };
  guests: Array<{
    id: string;
    name: string;
    isOrganizer: boolean;
    meals: {
      starter?: MealSummary;
      mainCourse: MealSummary;
      dessert?: MealSummary;
      drink?: MealSummary;
    };
  }>;
};

const selectSummary = (state: AppState): Summary => {
  const selectedTable = state.ordering.availableTables.data.find((table) => table.id === state.ordering.form.tableId);
  const table = { id: state.ordering.form.tableId!, title: selectedTable?.title ?? '' };

  const meals = new Map<string, MealSummary>(
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

export const useSummary = () => {
  function onNext() {
    dispatch(reserve());
  }

  function onPrevious() {
    dispatch(orderingSlice.actions.setStep(OrderingDomainModel.Step.MEALS));
  }

  const dispatch = useAppDispatch();
  const summary = useSelector(selectSummary);

  return {
    summary,
    onNext,
    onPrevious,
  };
};
