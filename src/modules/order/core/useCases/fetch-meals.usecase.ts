import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { Dependencies } from '@ratatouille/modules/store/dependencies';
import { AppDispatch, AppGetState } from '@ratatouille/modules/store/store';

export const fetchMeals = async (dispatch: AppDispatch, _: AppGetState, dependencies: Dependencies) => {
  dispatch(orderingSlice.actions.handleMealsLoading());
  try {
    const meals = await dependencies.mealGateway.getMeals();
    dispatch(orderingSlice.actions.storeMeals(meals));
  } catch (_) {
    dispatch(orderingSlice.actions.handleMealsError());
  }
};
