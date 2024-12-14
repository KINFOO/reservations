import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { AppDispatch } from '@ratatouille/modules/store/store';

export const chooseTable = (id: string) => (dispatch: AppDispatch) => {
  dispatch(orderingSlice.actions.chooseTable(id));
};
