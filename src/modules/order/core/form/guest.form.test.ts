import { IIDProvider } from '@ratatouille/core/id-provider';
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

class StubIdGenerator implements IIDProvider {
  generate(): string {
    return '1';
  }
}

const idGenerator = new StubIdGenerator();
const form = new GuestForm(idGenerator);
const emptyInitialState: OrderingDomainModel.Guest[] = [];
const singleUserState: OrderingDomainModel.Guest[] = [{ id: '1', firstName: 'John', lastName: 'Doe', age: 0 }];

describe('Add a guest', () => {
  it('should add a guest', () => {
    const state = form.addGuest(emptyInitialState);
    expect(state).toEqual(singleUserState);
  });

  it('should add a guest when there is already one', () => {
    const state = form.addGuest(singleUserState);
    expect(state).toEqual([
      { id: '1', firstName: 'John', lastName: 'Doe', age: 0 },
      { id: '1', firstName: 'John', lastName: 'Doe', age: 0 },
    ]);
  });
});

describe('Remove a guest', () => {
  it('should not remove when state is empty', () => {
    const state = form.removeGuest(emptyInitialState, '1');
    expect(state).toEqual(emptyInitialState);
  });

  it('should remove a guest from an id', () => {
    const [{ id }] = singleUserState;
    const state = form.removeGuest(singleUserState, id);
    expect(state).toEqual([]);
  });
});
