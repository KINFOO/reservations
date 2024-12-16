export namespace OrderingDomainModel {
  export enum Step {
    GUESTS = 0,
    TABLE = 1,
    MEALS = 2,
    SUMMARY = 3,
    RESERVED = 4,
  }

  export type Form = {
    guests: Guest[];
    organizerId?: string;
    tableId?: string;
  };

  export type MealId = string;

  export enum MealType {
    STARTER = 0,
    MAIN_COURSE = 1,
    DESSERT = 2,
    DRINK = 3,
  }

  export type Meal = {
    id: MealId;
    title: string;
    requiredAge?: number;
    type: MealType;
  };

  export type Guest = {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    meals: {
      starter?: MealId;
      mainCourse?: MealId;
      dessert?: MealId;
      drink?: MealId;
    };
  };

  export type Table = {
    id: string;
    title: string;
    capacity: number;
  };
}
