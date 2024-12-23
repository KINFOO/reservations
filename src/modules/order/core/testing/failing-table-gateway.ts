import { ITableGateway } from '@ratatouille/modules/order/core/gateway/table.gateway';

export class FailingTableGateway implements ITableGateway {
  async getTables(): Promise<any> {
    throw new Error('Unable to fetch tables');
  }
}
