import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { AppState, useAppDispatch } from '@ratatouille/modules/store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const useTable = () => {
  function onNext() {
    dispatch(orderingSlice.actions.setStep(OrderingDomainModel.Step.MEALS));
  }

  function onPrevious() {
    dispatch(orderingSlice.actions.setStep(OrderingDomainModel.Step.GUESTS));
  }

  function assignTable(id: string) {
    setAssignedTableId(id);
  }

  function isSubmittable() {
    return !!assignedTableId;
  }

  const dispatch = useAppDispatch();
  const [assignedTableId, setAssignedTableId] = useState<string | undefined>();
  const availableTables = useSelector((state: AppState) => state.ordering.avialableTables.data);

  return { assignedTableId, availableTables, onNext, onPrevious, assignTable, isSubmittable };
};
