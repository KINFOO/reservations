import { IMealGateway } from '@ratatouille/modules/order/core/gateway/meal.gateway';
import { MealFactory } from '@ratatouille/modules/order/core/model/meal-factory';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

export class InMemoryMealGateway implements IMealGateway {
  async getMeals() {
    return [
      MealFactory.create({ id: 'starter-1', title: 'Salade Nicoise', type: OrderingDomainModel.MealType.STARTER }),
      MealFactory.create({ id: 'starter-2', title: 'Salade Méchouia', type: OrderingDomainModel.MealType.STARTER }),
      MealFactory.create({ id: 'starter-3', title: 'Salade Wakame', type: OrderingDomainModel.MealType.STARTER }),
      MealFactory.create({ id: 'main-1', title: 'Blanquette de veau', type: OrderingDomainModel.MealType.MAIN_COURSE }),
      MealFactory.create({ id: 'main-2', title: 'Filet Boeuf', type: OrderingDomainModel.MealType.MAIN_COURSE }),
      MealFactory.create({
        id: 'main-3',
        title: 'Boeuf Tartare',
        type: OrderingDomainModel.MealType.MAIN_COURSE,
        requiredAge: 18,
      }),
      MealFactory.create({ id: 'dessert-1', title: 'Tarte aux pommes', type: OrderingDomainModel.MealType.DESSERT }),
      MealFactory.create({ id: 'dessert-2', title: 'Crème catalane', type: OrderingDomainModel.MealType.DESSERT }),
      MealFactory.create({
        id: 'dessert-3',
        title: 'Baba au rhum',
        type: OrderingDomainModel.MealType.DESSERT,
        requiredAge: 18,
      }),
      MealFactory.create({ id: 'drink-1', title: 'Eau gazeuse', type: OrderingDomainModel.MealType.DRINK }),
      MealFactory.create({ id: 'drink-2', title: 'Vin', type: OrderingDomainModel.MealType.DRINK, requiredAge: 18 }),
      MealFactory.create({
        id: 'drink-3',
        title: 'Champagne',
        type: OrderingDomainModel.MealType.DRINK,
        requiredAge: 18,
      }),
    ];
  }
}
