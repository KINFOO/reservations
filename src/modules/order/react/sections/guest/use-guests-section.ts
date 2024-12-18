import { useDependencies } from '@ratatouille/modules/app/react/DependenciesProvider';
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { selectForm } from '@ratatouille/modules/order/core/selectors/form.selector';
import { chooseGuests } from '@ratatouille/modules/order/core/useCases/choose-guests.usecase';
import { useAppDispatch } from '@ratatouille/modules/store/store';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const useGestsSection = () => {
  function addGuests() {
    const newState = guestForm.current.addGuest(form);
    setForm(newState);
  }

  function removeGuest(id: string) {
    const newState = guestForm.current.removeGuest(form, id);
    setForm(newState);
  }

  function updateGuest<T extends keyof OrderingDomainModel.Guest>(
    id: string,
    key: T,
    value: OrderingDomainModel.Guest[T]
  ) {
    const newState = guestForm.current.updateGuest(form, id, key, value);
    setForm(newState);
  }

  function changeOrganizer(id: string) {
    const newState = guestForm.current.changeOrganizer(form, id);
    setForm(newState);
  }

  function onNext() {
    dispatch(chooseGuests(form));
  }

  function isSubmittable() {
    return guestForm.current.isSubmittable(form);
  }

  const dispatch = useAppDispatch();
  const { idProvider } = useDependencies();
  const guestForm = useRef(new GuestForm(idProvider));

  const initialState = useSelector(selectForm);
  const [form, setForm] = useState<OrderingDomainModel.Form>(initialState);

  return { form, addGuests, removeGuest, updateGuest, changeOrganizer, onNext, isSubmittable };
};
