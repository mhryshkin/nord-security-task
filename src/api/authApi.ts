import { FormValues } from '../types/formValues';
import instance from './axios';

export default {
  login: (data: FormValues) => {
    return instance.post('/tokens', data).then((res) => {
      instance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      return res.data;
    });
  },
  logout: () => {
    delete instance.defaults.headers.common['Authorization'];
  },
};
