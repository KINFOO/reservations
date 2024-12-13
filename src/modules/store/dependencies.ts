import { IIDProvider } from '@ratatouille/core/id-provider';
import { ITableGateway } from '@ratatouille/modules/order/core/gateway/table.gateway';

export type Dependencies = {
  idProvider: IIDProvider;
  tableGateway: ITableGateway;
};
