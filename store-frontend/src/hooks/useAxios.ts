import axios from 'axios';

export const useAxios = axios.create({
  baseURL: 'http://app:3000/api/',
});
