import instance from './axios';

export default {
  getAll: () => {
    return instance.get('/servers').then((res) => {
      return res.data;
    });
  },
};
