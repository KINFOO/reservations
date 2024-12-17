import { IMealGateway } from '@ratatouille/modules/order/core/gateway/meal.gateway';

export class FailingMealGateway implements IMealGateway {
  async getMeals(): Promise<any> {
    throw new Error('Unable to fetch meals');
  }
}
