import { useEffect } from 'react';
import { useMutation } from 'react-query';

import serversApi from '../../api/serversApi';
import Spinner from '../../assets/spinner.svg';
import Table from '../../components/table';
import { COLUMNS } from '../../constants/tableConfig';

const ServersPage = () => {
  const {
    mutate: loadServers,
    isLoading,
    data,
  } = useMutation({
    mutationFn: () => {
      return serversApi.getAll();
    },
  });

  useEffect(() => {
    loadServers();
  }, []);

  return (
    <div className="relative block w-full rounded-lg p-10 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
      <h1 className="mb-4 text-center text-xl font-semibold">Servers</h1>
      {isLoading || !data ? (
        <img className="mx-auto" src={Spinner} alt="spinner" />
      ) : (
        <Table data={data} columns={COLUMNS} />
      )}
    </div>
  );
};

export default ServersPage;
