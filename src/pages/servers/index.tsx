import { useCallback, useEffect } from 'react';
import { useMutation } from 'react-query';
// import { useNavigate } from 'react-router-dom';

// import { useAuthContext } from '../../context/AuthContext';
import serversApi from '../../api/serversApi';
import Spinner from '../../assets/spinner.svg';

const ServersPage = () => {
  const {
    mutate: loadServers,
    isSuccess,
    isLoading,
    data,
    ...other
  } = useMutation({
    mutationFn: () => {
      return serversApi.getAll();
    },
  });

  useEffect(() => {
    loadServers();
  }, []);

  console.log('servers', { isSuccess, isLoading, data, other });

  return (
    <div className="relative block w-full rounded-lg bg-white shadow-lg">
      Servers Page
      {isLoading ? (
        <img className="mx-auto" src={Spinner} alt="spinner" />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Wrestler</th>
              <th>Signature Move(s)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>"Stone Cold" Steve Austin</td>
              <td>Stone Cold Stunner, Lou Thesz Press</td>
            </tr>
            <tr>
              <td>Bret "The Hitman" Hart</td>
              <td>The Sharpshooter</td>
            </tr>
            <tr>
              <td>Razor Ramon</td>
              <td>Razor's Edge, Fallaway Slam</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ServersPage;
