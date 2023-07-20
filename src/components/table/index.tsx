import { FC } from 'react';

import { Record } from '../../types/servers';

type Props = {
  data: Array<Record>;
};

const Table: FC<Props> = (data) => {
  return <table></table>;
};

export default Table;
