import { AppState } from '@ratatouille/modules/store/store';

export const selectTables = (state: AppState) => state.ordering.availableTables.data;
