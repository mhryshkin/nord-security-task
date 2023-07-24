import { fireEvent, render, within } from '@testing-library/react';
import Table from '../../../components/table';
import { ColumnKeys } from '../../../types/servers';

describe('<Table />', () => {
  const mockData = [
    { name: 'record1', distance: 20 },
    { name: 'record2', distance: 30 },
  ];

  const mockColumns = [
    { name: ColumnKeys.Name, label: 'Name' },
    { name: ColumnKeys.Distance, label: 'Distance' },
  ];
  it('renders table with columns and rows', () => {
    const { getByRole } = render(<Table data={mockData} columns={mockColumns} />);
    const table = getByRole('table');
    const allRows = within(table).getAllByRole('row');

    mockColumns.forEach((column) => {
      expect(within(allRows[0]).getByText(column.label)).toBeInTheDocument();
    });

    mockData.forEach((record, index) => {
      const row = allRows[index + 1];
      expect(within(row).getByText(record.name)).toBeInTheDocument();
      expect(within(row).getByText(record.distance.toString())).toBeInTheDocument();
    });
  });

  it('sorts table when column headers are clicked', () => {
    const { getByRole, rerender } = render(<Table data={mockData} columns={mockColumns} />);

    const nameHeader = within(getByRole('table')).getByText('Name');
    fireEvent.click(nameHeader);

    rerender(<Table data={mockData} columns={mockColumns} />);

    const bodyRows = within(getByRole('table')).getAllByRole('row').slice(1);
    const firstRowDataCells = within(bodyRows[0]).getAllByRole('cell');
    expect(firstRowDataCells[0]).toHaveTextContent('record1');

    fireEvent.click(nameHeader);

    rerender(<Table data={mockData} columns={mockColumns} />);

    const updatedBodyRows = within(getByRole('table')).getAllByRole('row').slice(1);
    const updatedFirstRowDataCells = within(updatedBodyRows[0]).getAllByRole('cell');
    expect(updatedFirstRowDataCells[0]).toHaveTextContent('record2');
  });
});
