import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OrderingState = {
  form: OrderingDomainModel.Form;
  step: OrderingDomainModel.Step;
  avialableTables: { data: OrderingDomainModel.Table[] };
};

export const initialState: OrderingState = {
  avialableTables: { data: [] },
  step: OrderingDomainModel.Step.GUESTS,
  form: {
    guests: [],
  },
};

export const orderingSlice = createSlice({
  name: 'ordering',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<OrderingDomainModel.Step>) {
      state.step = action.payload;
    },
    chooseGuests(state, action: PayloadAction<OrderingDomainModel.Form>) {
      state.form = action.payload;
    },
    storeTables(state, action: PayloadAction<OrderingDomainModel.Table[]>) {
      state.avialableTables.data = action.payload;
    },
  },
});

export const orderingReducer = orderingSlice.reducer;
export const orderingActions = orderingSlice.actions;
