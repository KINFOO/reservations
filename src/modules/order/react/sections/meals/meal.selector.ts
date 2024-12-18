import { AppState } from '@ratatouille/modules/store/store';

export const selectMeals = (state: AppState) => state.ordering.availableMeals.data;
