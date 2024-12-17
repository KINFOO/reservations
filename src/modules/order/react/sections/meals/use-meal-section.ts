import { MealForm } from '@ratatouille/modules/order/core/form/meal.form';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { AppState, useAppDispatch } from '@ratatouille/modules/store/store';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const useMeal = () => {
  function findGuest(guestId: string) {
    return form.guests.find((guest) => guest.id === guestId);
  }

  function getSelectableStarters(guestId: string): OrderingDomainModel.Meal[] {
    const guest = findGuest(guestId);
    return guest ? mealForm.current.getSelectableStarters(meals, guest) : [];
  }

  function getSelectableMainCourses(guestId: string): OrderingDomainModel.Meal[] {
    const guest = findGuest(guestId);
    return guest ? mealForm.current.getSelectableMainCourses(meals, guest) : [];
  }

  function getSelectableDesserts(guestId: string): OrderingDomainModel.Meal[] {
    const guest = findGuest(guestId);
    return guest ? mealForm.current.getSelectableDesserts(meals, guest) : [];
  }

  function getSelectableDrinks(guestId: string): OrderingDomainModel.Meal[] {
    const guest = findGuest(guestId);
    return guest ? mealForm.current.getSelectableDrinks(meals, guest) : [];
  }

  function assignStarter(guestId: string, mealId: string) {
    const nextState = mealForm.current.assignStarter(form, guestId, mealId);
    setForm(nextState);
  }

  function assignMainCourse(guestId: string, mealId: string) {
    const nextState = mealForm.current.assignMainCourse(form, guestId, mealId);
    setForm(nextState);
  }
  function assignDessert(guestId: string, mealId: string) {
    const nextState = mealForm.current.assignDessert(form, guestId, mealId);
    setForm(nextState);
  }

  function assignDrink(guestId: string, mealId: string) {
    const nextState = mealForm.current.assignDrink(form, guestId, mealId);
    setForm(nextState);
  }

  function isSubmittable() {
    return mealForm.current.isSubmittable(form);
  }

  function onPrevious() {
    dispatch(orderingSlice.actions.setStep(OrderingDomainModel.Step.TABLE));
  }

  function onNext() {
    dispatch(orderingSlice.actions.setStep(OrderingDomainModel.Step.SUMMARY));
  }

  const dispatch = useAppDispatch();
  const meals: OrderingDomainModel.Meal[] = [];
  const mealForm = useRef(new MealForm());

  const initialState = useSelector((state: AppState) => state.ordering.form);
  const [form, setForm] = useState<OrderingDomainModel.Form>(initialState);

  return {
    assignStarter,
    assignMainCourse,
    assignDessert,
    assignDrink,
    getSelectableStarters,
    getSelectableMainCourses,
    getSelectableDesserts,
    getSelectableDrinks,
    guests: form.guests,
    isSubmittable,
    onNext,
    onPrevious,
  };
};
