import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { fetchTables } from '@ratatouille/modules/order/core/useCases/fetch-table.usecase';
import { ListenerMiddlewareInstance } from '@reduxjs/toolkit';

export const registerFetcherListener = (listener: ListenerMiddlewareInstance) => {
  listener.startListening({
    actionCreator: orderingSlice.actions.setStep,
    effect: (action, api) => {
      switch (action.payload) {
        case OrderingDomainModel.Step.TABLE:
          api.dispatch(fetchTables as any);
          break;
      }
    },
  });
};
