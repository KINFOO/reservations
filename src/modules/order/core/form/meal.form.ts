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
}
