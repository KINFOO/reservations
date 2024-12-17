import { IMealGateway } from '@ratatouille/modules/order/core/gateway/meal.gateway';

export class InMemoryMealGateway implements IMealGateway {
  async getMeals() {
    return [];
  }
}
