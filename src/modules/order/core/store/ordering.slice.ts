import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OrderingState = {
  form: OrderingDomainModel.Form;
};

export const initialState: OrderingState = {
  form: {
    guests: [],
  },
};

export const orderingSlice = createSlice({
  name: 'ordering',
  initialState,
  reducers: {
    chooseGuests(state, action: PayloadAction<OrderingDomainModel.Form>) {
      state.form = action.payload;
    },
  },
});

export const orderingReducer = orderingSlice.reducer;
export const orderingActions = orderingSlice.actions;
