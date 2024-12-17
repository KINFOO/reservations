import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { Dependencies } from '@ratatouille/modules/store/dependencies';
import { AppDispatch, AppGetState } from '@ratatouille/modules/store/store';

export const reserve =
  () =>
  async (dispatch: AppDispatch, getState: AppGetState, { reservationGateway }: Dependencies) => {
    dispatch(orderingSlice.actions.handleReservationLoading());
    const form = getState().ordering.form;

    try {
      const result = await reservationGateway.reserve({
        tableId: form.tableId!,
        guests: form.guests.map((guest) => ({
          firstName: guest.firstName,
          lastName: guest.lastName,
          age: guest.age,
          isOrganizer: guest.id === form.organizerId,
          meals: {
            ...guest.meals,
            mainCourse: guest.meals.mainCourse!,
          },
        })),
      });
      dispatch(orderingSlice.actions.handleReservationSuccess());
    } catch (_) {
      dispatch(orderingSlice.actions.handleReservationError());
    }
  };
