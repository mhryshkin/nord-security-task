import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';
import serversApi from '../../api/serversApi';

const ServersPage = () => {
  const { token, isLoaded, isLoading } = useAuthContext();
  const navigate = useNavigate();

  const {
    mutate: loadServers,
    isSuccess,
    isLoading: isServerListLoading,
    data,
  } = useMutation({
    mutationFn: () => {
      return serversApi.getAll();
    },
  });

  useEffect(() => {
    loadServers();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isLoaded && !token) {
    navigate('/login');
    return null;
  }

  console.log('servers', { isSuccess, isServerListLoading, data });

  return <p>Servers Page</p>;
};

export default ServersPage;
