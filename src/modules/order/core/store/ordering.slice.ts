import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum OrderingStep {
  GUESTS = 0,
  TABLE = 1,
  MEALS = 2,
  SUMMARY = 3,
  RESERVED = 4,
}

export type OrderingState = {
  form: OrderingDomainModel.Form;
  step: OrderingStep;
};

export const initialState: OrderingState = {
  step: OrderingStep.GUESTS,
  form: {
    guests: [],
  },
};

export const orderingSlice = createSlice({
  name: 'ordering',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<OrderingStep>) {
      state.step = action.payload;
    },
    chooseGuests(state, action: PayloadAction<OrderingDomainModel.Form>) {
      state.form = action.payload;
    },
  },
});

export const orderingReducer = orderingSlice.reducer;
export const orderingActions = orderingSlice.actions;
