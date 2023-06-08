import axios from 'axios';
import queryString from 'query-string';
import { TableAvailabilityInterface } from 'interfaces/table-availability';
import { GetQueryInterface } from '../../interfaces';

export const getTableAvailabilities = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/table-availabilities${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTableAvailability = async (tableAvailability: TableAvailabilityInterface) => {
  const response = await axios.post('/api/table-availabilities', tableAvailability);
  return response.data;
};

export const updateTableAvailabilityById = async (id: string, tableAvailability: TableAvailabilityInterface) => {
  const response = await axios.put(`/api/table-availabilities/${id}`, tableAvailability);
  return response.data;
};

export const getTableAvailabilityById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/table-availabilities/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTableAvailabilityById = async (id: string) => {
  const response = await axios.delete(`/api/table-availabilities/${id}`);
  return response.data;
};
