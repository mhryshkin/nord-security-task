import { Paths } from '../constants/localStorage';

export const loadAuthToken = () => {
  const savedValue = localStorage.getItem(Paths.TOKEN);
  return savedValue ? JSON.parse(savedValue) : null;
};

export const saveAuthToken = (newValue: any) => {
  return localStorage.setItem(Paths.TOKEN, JSON.stringify(newValue));
};
