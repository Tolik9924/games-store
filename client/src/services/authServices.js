import API from '../API';
import { updateToken, removeToken } from '../services/tokenService';

export const registration = async (user) => {
  console.log('registration: ', user);
  const { data } = await API.post('api/user/registration', user);
  return data;
}

export const login = async (user) => {
  const data = await API.post('api/user/login', user);
  updateToken(data.data.token);
  return data;
};