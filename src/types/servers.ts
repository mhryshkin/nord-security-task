export type Record = {
  name: string;
  distance: number;
};

export enum ColumnKeys {
  Name = 'name',
  Distance = 'distance',
}

export type Column = {
  name: ColumnKeys;
  label: string;
};
