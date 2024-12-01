import { useDependencies } from '@ratatouille/modules/app/react/DependenciesProvider';
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { useRef, useState } from 'react';

export const useGestsSection = () => {
  function addGuests() {
    const newState = guestForm.current.addGuest(guests);
    setGuests(newState);
  }

  function removeGuest(id: string) {
    const newState = guestForm.current.removeGuest(guests, id);
    setGuests(newState);
  }

  function updateGuest(id: string, key: string, value: any) {}

  function changeOrganizer() {}

  function onNext() {}

  function isSubmittable() {
    return false;
  }

  const { idProvider } = useDependencies();
  const guestForm = useRef(new GuestForm(idProvider));
  const [guests, setGuests] = useState<OrderingDomainModel.Guest[]>([]);

  return { guests, addGuests, removeGuest, updateGuest, changeOrganizer, onNext, isSubmittable: isSubmittable() };
};
