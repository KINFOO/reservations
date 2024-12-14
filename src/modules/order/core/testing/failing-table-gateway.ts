import { ITableGateway } from '@ratatouille/modules/order/core/gateway/table.gateway';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

export class FailingTableGateway implements ITableGateway {
  constructor(private data: OrderingDomainModel.Table[] = []) {}

  async getTables(): Promise<any> {
    throw new Error('Unable to fetch tables');
  }
}
