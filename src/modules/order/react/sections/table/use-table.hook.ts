import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { selectTables } from '@ratatouille/modules/order/core/selectors/table.selector';
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { chooseTable } from '@ratatouille/modules/order/core/useCases/choose-table.usecase';
import { useAppDispatch } from '@ratatouille/modules/store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const useTable = () => {
  function onNext() {
    if (!assignedTableId) {
      throw new Error('Table must be assigned');
    }
    dispatch(chooseTable(assignedTableId));
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
  const availableTables = useSelector(selectTables);

  return { assignedTableId, availableTables, onNext, onPrevious, assignTable, isSubmittable };
};
