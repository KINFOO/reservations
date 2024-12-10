import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { orderingActions } from '@ratatouille/modules/order/core/store/ordering.slice';
import { AppDispatch } from '@ratatouille/modules/store/store';

export const chooseGuests = (form: OrderingDomainModel.Form) => (dispatch: AppDispatch) => {
  dispatch(orderingActions.chooseGuests(form));
};
