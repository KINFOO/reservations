import { IIDProvider } from '@ratatouille/core/id-provider';
import { nanoid } from 'nanoid';

export class SystemIDProvider implements IIDProvider {
  generate() {
    return nanoid();
  }
}
