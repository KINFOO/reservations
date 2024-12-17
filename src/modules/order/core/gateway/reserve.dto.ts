export type ReservationDTO = {
  tableId: string;
  guests: Array<{
    firstName: string;
    lastName: string;
    age: number;
    isOrganizer: boolean;
    meals: {
      starter?: string;
      mainCourse: string;
      dessert?: string;
      drink?: string;
    };
  }>;
};
