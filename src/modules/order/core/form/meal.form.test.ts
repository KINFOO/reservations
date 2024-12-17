import { MealForm } from '@ratatouille/modules/order/core/form/meal.form';
import { GuestFactory } from '@ratatouille/modules/order/core/model/guest-factory';
import { MealFactory } from '@ratatouille/modules/order/core/model/meal-factory';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

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

describe('Selecting meals', () => {
  it.each([
    { key: 'no meals', meals: [], guest: adultGuest, expected: [] },
    { key: 'an adult', meals, guest: adultGuest, expected: [regularStarter, adultStarter] },
    { key: 'a child', meals, guest: childGuest, expected: [regularStarter] },
  ])('provides starters for %s', ({ meals, guest, expected }) => {
    const starters = mealForm.getSelectableStarters(meals, guest);

    expect(starters).toEqual(expected);
  });

  it.each([
    { key: 'no meals', meals: [], guest: adultGuest, expected: [] },
    { key: 'an adult', meals, guest: adultGuest, expected: [regularMainCourse, adultMainCourse] },
    { key: 'a child', meals, guest: childGuest, expected: [regularMainCourse] },
  ])('provides main courses for %s', ({ meals, guest, expected }) => {
    const starters = mealForm.getSelectableMainCourses(meals, guest);

    expect(starters).toEqual(expected);
  });

  it.each([
    { key: 'no meals', meals: [], guest: adultGuest, expected: [] },
    { key: 'an adult', meals, guest: adultGuest, expected: [regularDessert, adultDessert] },
    { key: 'a child', meals, guest: childGuest, expected: [regularDessert] },
  ])('provides desserts for %s', ({ meals, guest, expected }) => {
    const starters = mealForm.getSelectableDesserts(meals, guest);

    expect(starters).toEqual(expected);
  });

  it.each([
    { key: 'no meals', meals: [], guest: adultGuest, expected: [] },
    { key: 'an adult', meals, guest: adultGuest, expected: [regularDrink, adultDrink] },
    { key: 'a child', meals, guest: childGuest, expected: [regularDrink] },
  ])('provides drinks for %s', ({ meals, guest, expected }) => {
    const starters = mealForm.getSelectableDrinks(meals, guest);

    expect(starters).toEqual(expected);
  });
});

describe('Assigning meals', () => {
  const form: OrderingDomainModel.Form = {
    guests: [adultGuest, childGuest],
    organizerId: adultGuest.id,
    tableId: '1',
  };

  describe('assigning starter', () => {
    it('clears a starter', () => {
      const result = mealForm.assignStarter(form, adultGuest.id, undefined);

      expect(result.guests[0].meals.starter).toBeUndefined();
    });

    it('assigns a starter', () => {
      const result = mealForm.assignStarter(form, adultGuest.id, adultStarter.id);

      expect(result.guests[0].meals.starter).toBe(adultStarter.id);
    });

    it('does not assign a starter for unknown guest', () => {
      const result = mealForm.assignStarter(form, 'does-not-exist', adultStarter.id);

      expect(result).toEqual(form);
    });
  });

  describe('assinging main course', () => {
    it('clears a main course', () => {
      const result = mealForm.assignMainCourse(form, adultGuest.id, undefined);

      expect(result.guests[0].meals.mainCourse).toBeUndefined();
    });

    it('assigns a main course', () => {
      const result = mealForm.assignMainCourse(form, adultGuest.id, adultMainCourse.id);

      expect(result.guests[0].meals.mainCourse).toBe(adultMainCourse.id);
    });

    it('does not assign a main course', () => {
      const result = mealForm.assignMainCourse(form, 'does-not-exist', adultMainCourse.id);

      expect(result).toEqual(form);
    });
  });

  describe('assinging dessert', () => {
    it('clears a dessert', () => {
      const result = mealForm.assignDessert(form, adultGuest.id, undefined);

      expect(result.guests[0].meals.dessert).toBeUndefined();
    });

    it('assigns a dessert', () => {
      const result = mealForm.assignDessert(form, adultGuest.id, adultDessert.id);

      expect(result.guests[0].meals.dessert).toBe(adultDessert.id);
    });

    it('does not assign a dessert', () => {
      const result = mealForm.assignDessert(form, 'does-not-exist', adultDessert.id);

      expect(result).toEqual(form);
    });
  });

  describe('assinging drink', () => {
    it('clears a drink', () => {
      const result = mealForm.assignDrink(form, adultGuest.id, undefined);

      expect(result.guests[0].meals.drink).toBeUndefined();
    });

    it('assigns a drink', () => {
      const result = mealForm.assignDrink(form, adultGuest.id, adultDrink.id);

      expect(result.guests[0].meals.drink).toBe(adultDrink.id);
    });

    it('does not assign a drink', () => {
      const result = mealForm.assignDrink(form, 'does-not-exist', adultDrink.id);

      expect(result).toEqual(form);
    });
  });

  describe('meal form is submittable', () => {
    const unsubmittalbleForm: OrderingDomainModel.Form = {
      guests: [GuestFactory.create()],
    };

    const submittalbleForm: OrderingDomainModel.Form = {
      guests: [GuestFactory.create({ meals: { mainCourse: regularMainCourse.id } })],
    };

    it.each([
      { key: 'no main course is not submittable', form: unsubmittalbleForm, isSubmittable: false },
      { key: 'main course is submittable', form: submittalbleForm, isSubmittable: true },
    ])('is %s submittable', ({ form, isSubmittable }) => {
      expect(mealForm.isSubmittable(form)).toBe(isSubmittable);
    });
  });
});
