import { ITableGateway } from '@ratatouille/modules/order/core/gateway/table.gateway';
import { TableFactory } from '@ratatouille/modules/order/core/model/table-factory';

export class InMemoryTableGateway implements ITableGateway {
  async getTables() {
    return [TableFactory.create({ id: '1', title: 'Près de la fenêtre', capacity: 3 })];
  }
}
