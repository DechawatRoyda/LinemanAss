import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const fetchRestaurants = async (): Promise<{ restaurantIds: number[] }> => {
  const response: AxiosResponse = await axios.get(`${API_BASE_URL}/restaurants`);
  return response.data;
};

const fetchRestaurantDetails = async (restaurantId: number): Promise<any> => {
  const response: AxiosResponse = await axios.get(`${API_BASE_URL}/restaurants/${restaurantId}`);
  return response.data;
};

const fetchShortMenu = async (restaurantId: number, menuName: string): Promise<any> => {
  const response: AxiosResponse = await axios.get(`${API_BASE_URL}/restaurants/${restaurantId}/menus/${menuName}/short`);
  return response.data;
};

const fetchFullMenu = async (restaurantId: number, menuName: string): Promise<any> => {
  const response: AxiosResponse = await axios.get(`${API_BASE_URL}/restaurants/${restaurantId}/menus/${menuName}/full`);
  return response.data;
};

export { fetchRestaurants, fetchRestaurantDetails, fetchShortMenu, fetchFullMenu };