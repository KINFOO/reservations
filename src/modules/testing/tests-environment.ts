import { StubIdProvider } from '@ratatouille/core/stub-id-providers';
import { MockReservationGateway } from '@ratatouille/modules/order/core/testing/mock-reservation-gateway';
import { StubMealGateway } from '@ratatouille/modules/order/core/testing/stub-meal-gateway';
import { StubTableGateway } from '@ratatouille/modules/order/core/testing/stub-table-gateway';
import { Dependencies } from '@ratatouille/modules/store/dependencies';
import { AppState, createStore } from '@ratatouille/modules/store/store';

/**
 * Create testing dependencies with provided defaults
 * @param dependencies
 * @returns
 */
const createDependencies = (dependencies?: Partial<Dependencies>): Dependencies => ({
  idProvider: new StubIdProvider(),
  tableGateway: new StubTableGateway(),
  mealGateway: new StubMealGateway(),
  reservationGateway: new MockReservationGateway(),
  ...dependencies,
});

/**
 * Creates store initialized with a partial state
 * @param config
 * @returns
 */
export const createTestStore = (config?: {
  initialState?: Partial<AppState>;
  dependencies?: Partial<Dependencies>;
}) => {
  const initialStore = createStore({
    dependencies: createDependencies(config?.dependencies),
  });

  const initialState = {
    ...initialStore.getState(),
    ...config?.initialState,
  };

  const store = createStore({
    initialState,
    dependencies: createDependencies(config?.dependencies),
  });

  return store;
};

/**
 * Useful for testing selectors without setting redux up
 * @param partialState
 * @returns
 */
export const createTestState = (partialState?: Partial<AppState>) => {
  const store = createStore({
    dependencies: createDependencies(),
  });

  const storeInitialState = store.getState();

  const merged = {
    ...storeInitialState,
    ...partialState,
  };

  return createTestStore({ initialState: merged }).getState();
};
