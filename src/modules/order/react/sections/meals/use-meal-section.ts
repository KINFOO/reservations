import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { useAppDispatch } from '@ratatouille/modules/store/store';

export const useMeal = () => {
  function getSelectableStarters(guestId: string): OrderingDomainModel.Meal[] {
    return [];
  }

  function getSelectableMainCourses(guestId: string): OrderingDomainModel.Meal[] {
    return [];
  }

  function getSelectableDesserts(guestId: string): OrderingDomainModel.Meal[] {
    return [];
  }

  function getSelectableDrinks(guestId: string): OrderingDomainModel.Meal[] {
    return [];
  }

  function assignStarter(guestId: string, mealId: string) {}
  function assignMainCourse(guestId: string, mealId: string) {}
  function assignDessert(guestId: string, mealId: string) {}
  function assignDrink(guestId: string, mealId: string) {}

  function isSubmittable() {
    return false;
  }

  function onPrevious() {
    dispatch(orderingSlice.actions.setStep(OrderingDomainModel.Step.TABLE));
  }

  function onNext() {
    dispatch(orderingSlice.actions.setStep(OrderingDomainModel.Step.SUMMARY));
  }

  const dispatch = useAppDispatch();
  const guests: OrderingDomainModel.Guest[] = [];

  return {
    assignStarter,
    assignMainCourse,
    assignDessert,
    assignDrink,
    getSelectableStarters,
    getSelectableMainCourses,
    getSelectableDesserts,
    getSelectableDrinks,
    guests,
    isSubmittable,
    onNext,
    onPrevious,
  };
};
