import { FormValues } from '../types/formValues';
import instance from './axios';

export default {
  login: (data: FormValues) => {
    return instance.post('/tokens', data).then((res) => res.data);
  },
};
