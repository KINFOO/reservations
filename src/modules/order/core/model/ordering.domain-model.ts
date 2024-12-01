export namespace OrderingDomainModel {
  export type Form = {
    guests: Guest[];
    organizerId?: string;
  };

  export type Guest = {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
  };
}
