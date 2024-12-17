/**
 *  getSelectableStarters
 *  getSelectableMainCourses
 *  getSelectableDesserts
 *  getSelectableDrinks
 *
 * assignStarter
 * assignMainCourse
 * assignDessert
 * assignDrink
 *
 * isSubmittable
 */

import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { produce } from 'immer';
// import { AppState } from '@ratatouille/modules/store/store';
// import { useSelector } from 'react-redux';

export class MealForm {
  private static isMealType(meal: OrderingDomainModel.Meal, type: OrderingDomainModel.MealType): boolean {
    return meal.type === type;
  }

  private static hasRequiredAge(meal: OrderingDomainModel.Meal, guest: OrderingDomainModel.Guest): boolean {
    if (typeof meal.requiredAge === 'number' && guest.age < meal.requiredAge) {
      return false;
    }
    return true;
  }

  getSelectableStarters(
    meals: OrderingDomainModel.Meal[],
    guest: OrderingDomainModel.Guest
  ): OrderingDomainModel.Meal[] {
    return meals.filter(
      (meal) =>
        MealForm.isMealType(meal, OrderingDomainModel.MealType.STARTER) && //
        MealForm.hasRequiredAge(meal, guest)
    );
  }

  getSelectableMainCourses(
    meals: OrderingDomainModel.Meal[],
    guest: OrderingDomainModel.Guest
  ): OrderingDomainModel.Meal[] {
    return meals.filter(
      (meal) =>
        MealForm.isMealType(meal, OrderingDomainModel.MealType.MAIN_COURSE) && //
        MealForm.hasRequiredAge(meal, guest)
    );
  }

  getSelectableDesserts(
    meals: OrderingDomainModel.Meal[],
    guest: OrderingDomainModel.Guest
  ): OrderingDomainModel.Meal[] {
    return meals.filter(
      (meal) =>
        MealForm.isMealType(meal, OrderingDomainModel.MealType.DESSERT) && //
        MealForm.hasRequiredAge(meal, guest)
    );
  }

  getSelectableDrinks(meals: OrderingDomainModel.Meal[], guest: OrderingDomainModel.Guest): OrderingDomainModel.Meal[] {
    return meals.filter(
      (meal) =>
        MealForm.isMealType(meal, OrderingDomainModel.MealType.DRINK) && //
        MealForm.hasRequiredAge(meal, guest)
    );
  }

  assignStarter(form: OrderingDomainModel.Form, guestId: string, mealId: OrderingDomainModel.MealId | undefined) {
    return produce(form, (draft) => {
      const guest = draft.guests.find((guest) => guest.id === guestId);
      if (guest) {
        guest.meals.starter = mealId;
      }
    });
  }

  assignMainCourse(form: OrderingDomainModel.Form, guestId: string, mealId: OrderingDomainModel.MealId | undefined) {
    return produce(form, (draft) => {
      const guest = draft.guests.find((guest) => guest.id === guestId);
      if (guest) {
        guest.meals.mainCourse = mealId;
      }
    });
  }

  assignDessert(form: OrderingDomainModel.Form, guestId: string, mealId: OrderingDomainModel.MealId | undefined) {
    return produce(form, (draft) => {
      const guest = draft.guests.find((guest) => guest.id === guestId);
      if (guest) {
        guest.meals.dessert = mealId;
      }
    });
  }

  assignDrink(form: OrderingDomainModel.Form, guestId: string, mealId: OrderingDomainModel.MealId | undefined) {
    return produce(form, (draft) => {
      const guest = draft.guests.find((guest) => guest.id === guestId);
      if (guest) {
        guest.meals.drink = mealId;
      }
    });
  }

  isSubmittable(form: OrderingDomainModel.Form) {
    return form.guests.every((guest) => guest.meals.mainCourse);
  }
}
