import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState: OrderingDomainModel.State = {
  availableTables: { status: 'idle', data: [] },
  availableMeals: { status: 'idle', data: [] },
  step: OrderingDomainModel.Step.GUESTS,
  reservationStatus: 'idle',
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
    chooseMeal(state, action: PayloadAction<OrderingDomainModel.Form>) {
      state.form = action.payload;
    },
    chooseTable(state, action: PayloadAction<string>) {
      state.form.tableId = action.payload;
    },
    handleTablesError(state) {
      state.availableTables.status = 'error';
    },
    handleTablesLoading(state) {
      state.availableTables.status = 'loading';
    },
    handleMealsError(state) {
      state.availableMeals.status = 'error';
    },
    handleMealsLoading(state) {
      state.availableMeals.status = 'loading';
    },
    handleReservationLoading(state) {
      state.reservationStatus = 'loading';
    },
    handleReservationError(state) {
      state.reservationStatus = 'error';
    },
    handleReservationSuccess(state) {
      state.reservationStatus = 'success';
    },
    setStep(state, action: PayloadAction<OrderingDomainModel.Step>) {
      state.step = action.payload;
    },
    storeMeals(state, action: PayloadAction<OrderingDomainModel.Meal[]>) {
      state.availableMeals.data = action.payload;
      state.availableMeals.status = 'success';
    },
    storeTables(state, action: PayloadAction<OrderingDomainModel.Table[]>) {
      state.availableTables.data = action.payload;
      state.availableTables.status = 'success';
    },
  },
});

export const orderingReducer = orderingSlice.reducer;
export const orderingActions = orderingSlice.actions;
