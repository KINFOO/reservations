import { SystemIDProvider } from '@ratatouille/core/system-id-provider';
import { InMemoryMealGateway } from '@ratatouille/modules/order/core/gateway-infra/in-memory.meal-gateway';
import { InMemoryReservationGateway } from '@ratatouille/modules/order/core/gateway-infra/in-memory.reservation.gateway';
import { InMemoryTableGateway } from '@ratatouille/modules/order/core/gateway-infra/in-memory.table-gateway';
import { Dependencies } from '@ratatouille/modules/store/dependencies';
import { AppStore, createStore } from '@ratatouille/modules/store/store';

export class App {
  public dependencies: Dependencies;
  public store: AppStore;

  constructor() {
    this.dependencies = this.setupDependencies();
    this.store = createStore({ dependencies: this.dependencies });
  }

  setupDependencies(): Dependencies {
    return {
      idProvider: new SystemIDProvider(),
      mealGateway: new InMemoryMealGateway(),
      tableGateway: new InMemoryTableGateway(),
      reservationGateway: new InMemoryReservationGateway(),
    };
  }
}

export const app = new App();
