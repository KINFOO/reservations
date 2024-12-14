import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OrderingState = {
  form: OrderingDomainModel.Form;
  step: OrderingDomainModel.Step;
  avialableTables: {
    data: OrderingDomainModel.Table[];
    status: 'idle' | 'loading' | 'success' | 'error';
  };
};

export const initialState: OrderingState = {
  avialableTables: { status: 'idle', data: [] },
  step: OrderingDomainModel.Step.GUESTS,
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
    handleTablesError(state) {
      state.avialableTables.status = 'error';
    },
    handleTablesLoading(state) {
      state.avialableTables.status = 'loading';
    },
    setStep(state, action: PayloadAction<OrderingDomainModel.Step>) {
      state.step = action.payload;
    },
    storeTables(state, action: PayloadAction<OrderingDomainModel.Table[]>) {
      state.avialableTables.data = action.payload;
      state.avialableTables.status = 'success';
    },
  },
});

export const orderingReducer = orderingSlice.reducer;
export const orderingActions = orderingSlice.actions;
