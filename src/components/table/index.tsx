import { FC, useCallback, useEffect, useState } from 'react';

import { Column, ColumnKeys, Record } from '../../types/servers';
import { SortDirection } from '../../types/table';
import ArrowIcon from '../ArrowIcon';

type Props = {
  data: Array<Record>;
  columns: Array<Column>;
};

const Table: FC<Props> = ({ data, columns }) => {
  const [sortingConfig, setSortingData] = useState<{ key: string; direction: string }>();
  const [sortedData, setSortedData] = useState<Array<Record>>(data);

  const sort = useCallback(
    (key: string) => {
      const isAscSorted =
        sortingConfig && sortingConfig.key === key && sortingConfig.direction === SortDirection.asc;
      const direction = isAscSorted ? SortDirection.desc : SortDirection.asc;

      setSortingData({ key, direction });
    },
    [sortingConfig]
  );

  useEffect(() => {
    const updatedData = [...sortedData];

    if (sortingConfig) {
      updatedData.sort((a, b) => {
        const key = sortingConfig.key as ColumnKeys;
        if (a[key] < b[key]) {
          return sortingConfig.direction === SortDirection.asc ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortingConfig.direction === SortDirection.asc ? 1 : -1;
        }
        return 0;
      });
    }

    setSortedData(updatedData);
  }, [sortingConfig]);

  return (
    <table className="mx-auto table-fixed w-full">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.name}
              className="px-2 py-1 md:px-4 md:py-2 min-w-[192px] content-center justify-center"
              onClick={() => sort(column.name)}
            >
              <div className="w-full flex cursor-pointer items-center">
                {column.label}
                <div className="flex flex-col content-center ml-3">
                  <>
                    <ArrowIcon
                      isActive={
                        sortingConfig &&
                        sortingConfig.key === column.name &&
                        sortingConfig.direction === SortDirection.asc
                      }
                    />
                    <ArrowIcon
                      className="rotate-180"
                      isActive={
                        sortingConfig &&
                        sortingConfig.key === column.name &&
                        sortingConfig.direction === SortDirection.desc
                      }
                    />
                  </>
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((record: Record) => (
          <tr key={`${record.name}-${record.distance}`}>
            {columns.map((column) => (
              <td key={column.name} className="px-2 py-1 md:px-4 md:py-2 border">
                {record[column.name]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
