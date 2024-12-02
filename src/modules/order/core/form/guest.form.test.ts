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
const emptyInitialState: OrderingDomainModel.Form = { guests: [] };
const singleGuestState: OrderingDomainModel.Form = {
  guests: [{ id: '1', firstName: 'John', lastName: 'Doe', age: 0 }],
};
const singleOrganizerState = { ...singleGuestState, organizerId: '1' };

describe('Add a guest', () => {
  it('should add a guest', () => {
    const state = form.addGuest(emptyInitialState);
    expect(state).toEqual(singleGuestState);
  });

  it('should add a guest when there is already one', () => {
    const state = form.addGuest(singleGuestState);
    expect(state).toEqual({
      guests: [
        { id: '1', firstName: 'John', lastName: 'Doe', age: 0 },
        { id: '1', firstName: 'John', lastName: 'Doe', age: 0 },
      ],
    });
  });
});

describe('Remove a guest', () => {
  it('should not remove when state is empty', () => {
    const state = form.removeGuest(emptyInitialState, '1');
    expect(state).toEqual(emptyInitialState);
  });

  it('should remove a guest from an id', () => {
    const {
      guests: [{ id }],
    } = singleGuestState;
    const state = form.removeGuest(singleGuestState, id);
    expect(state).toEqual(emptyInitialState);
  });
});

describe('Add an organizer', () => {
  it('should not set organiserId when guest does not exist', () => {
    const state = form.changeOrganizer(emptyInitialState, '1');
    expect(state.organizerId).toBeUndefined();
  });

  it('should set organiserId when guest exist', () => {
    const state = form.changeOrganizer(singleGuestState, '1');
    expect(state.organizerId).toEqual('1');
  });

  it('should unset organiserId when guest is deleted', () => {
    const initalState = form.changeOrganizer(singleGuestState, '1');
    const state = form.removeGuest(initalState, '1');
    expect(state.organizerId).toBeUndefined();
  });
});

describe('Is submitable', () => {
  it('should not be submitable when there is no organizer', () => {
    const isSubmittable = form.isSubmittable(emptyInitialState);
    expect(isSubmittable).toBe(false);
  });

  it('should submitable when there is an organizer', () => {
    const isSubmittable = form.isSubmittable(singleOrganizerState);
    expect(isSubmittable).toBe(true);
  });

  it('should not be submitable when organizer is deleted', () => {
    const state = form.removeGuest(singleOrganizerState, '1');
    const isSubmittable = form.isSubmittable(state);
    expect(isSubmittable).toBe(false);
  });
});

describe('Update guest', () => {
  it.each([
    { key: 'firstName' as keyof OrderingDomainModel.Guest, value: 'Jane' },
    { key: 'lastName' as keyof OrderingDomainModel.Guest, value: 'Wick' },
    { key: 'age' as keyof OrderingDomainModel.Guest, value: 42 },
  ])("should update guest's %s", ({ key, value }) => {
    const state = form.updateGuest(singleGuestState, '1', key, value);
    expect(state.guests[0][key]).toBe(value);
  });

  it('should not update when guest does not exist', () => {
    const state = form.updateGuest(singleGuestState, '12', 'firstName', 'Jane');
    expect(state.guests[0].firstName).toBe('John');
  });
});
