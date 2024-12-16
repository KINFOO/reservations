import { MealForm } from '@ratatouille/modules/order/core/form/meal.form';
import { GuestFactory } from '@ratatouille/modules/order/core/model/guest-factory';
import { MealFactory } from '@ratatouille/modules/order/core/model/meal-factory';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

describe('Selecting meals', () => {
  const adultGuest = GuestFactory.create({ age: 24 });
  const childGuest = GuestFactory.create({ age: 12, id: '2', firstName: 'Jane' });

  const mealForm = new MealForm();

  const regularStarter = MealFactory.create({
    id: 'starter-1',
    title: 'Salade',
    type: OrderingDomainModel.MealType.STARTER,
  });

  const adultStarter = MealFactory.create({
    id: 'starter-2',
    title: 'Salade',
    type: OrderingDomainModel.MealType.STARTER,
    requiredAge: 18,
  });

  const regularMainCourse = MealFactory.create({
    id: 'main-course-1',
    title: 'Pizza',
    type: OrderingDomainModel.MealType.MAIN_COURSE,
  });

  const adultMainCourse = MealFactory.create({
    id: 'main-course-2',
    title: 'Pizza',
    type: OrderingDomainModel.MealType.MAIN_COURSE,
    requiredAge: 18,
  });

  const regularDessert = MealFactory.create({
    id: 'dessert-1',
    title: 'Tarte aux pommes',
    type: OrderingDomainModel.MealType.DESSERT,
  });

  const adultDessert = MealFactory.create({
    id: 'dessert-2',
    title: 'Tarte flambée',
    type: OrderingDomainModel.MealType.DESSERT,
    requiredAge: 18,
  });

  const regularDrink = MealFactory.create({
    id: 'drink-1',
    title: 'Royal soda',
    type: OrderingDomainModel.MealType.DRINK,
  });

  const adultDrink = MealFactory.create({
    id: 'drink-2',
    title: 'Vin',
    type: OrderingDomainModel.MealType.DRINK,
    requiredAge: 18,
  });

  const meals = [
    regularStarter,
    adultStarter,
    regularMainCourse,
    adultMainCourse,
    regularDessert,
    adultDessert,
    regularDrink,
    adultDrink,
  ];

  it.each([
    { key: 'no meals', meals: [], guest: adultGuest, expected: [] },
    { key: 'an adult', meals, guest: adultGuest, expected: [regularStarter, adultStarter] },
    { key: 'a child', meals, guest: childGuest, expected: [regularStarter] },
  ])('provides starters for %s', ({ meals, guest, expected }) => {
    const starters = mealForm.getSelectableStarters(meals, guest);

    expect(starters).toEqual(expected);
  });
});
