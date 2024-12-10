'use client';
import { useSelector } from 'react-redux';

import { OrderingStep } from '@ratatouille/modules/order/core/store/ordering.slice';
import { GuestsSection } from '@ratatouille/modules/order/react/sections/guest/GuestsSection';
import { MealsSection } from '@ratatouille/modules/order/react/sections/meals/MealsSection';
import { ReservedSection } from '@ratatouille/modules/order/react/sections/reserved/ReservedSection';
import { SummarySection } from '@ratatouille/modules/order/react/sections/summary/SummarySection';
import { TableSection } from '@ratatouille/modules/order/react/sections/table/tableSection';
import { AppState } from '@ratatouille/modules/store/store';
import React from 'react';

export const OrderPage: React.FC = () => {
  const step = useSelector((state: AppState) => state.ordering.step);
  return (
    <main>
      {step === OrderingStep.GUESTS && <GuestsSection />}
      {step === OrderingStep.MEALS && <MealsSection />}
      {step === OrderingStep.TABLE && <TableSection />}
      {step === OrderingStep.SUMMARY && <SummarySection />}
      {step === OrderingStep.RESERVED && <ReservedSection />}
    </main>
  );
};
