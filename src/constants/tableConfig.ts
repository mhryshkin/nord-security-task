import { Column, ColumnKeys } from '../types/servers';

export const COLUMNS: Array<Column> = [
  { name: ColumnKeys.Name, label: 'Name' },
  { name: ColumnKeys.Distance, label: 'Destination' },
];
