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
  getSelectableStarters(
    meals: OrderingDomainModel.Meal[],
    guest: OrderingDomainModel.Guest
  ): OrderingDomainModel.Meal[] {
    return meals.filter((meal) => {
      if (meal.type !== OrderingDomainModel.MealType.STARTER) {
        return false;
      }

      if (typeof meal.requiredAge === 'number' && guest.age < meal.requiredAge) {
        return false;
      }
      return true;
    });
  }
}
