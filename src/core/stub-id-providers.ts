import { IIDProvider } from '@ratatouille/core/id-provider';

export class StubIdProvider implements IIDProvider {
  generate(): string {
    return '1';
  }
}
