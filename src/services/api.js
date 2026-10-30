import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, '');
const http = axios.create({ baseURL: API_BASE_URL, timeout: 60000 });

function requireApiUrl() {
  if (!API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL을 설정한 뒤 개발 서버 재시작 또는 재배포가 필요합니다.');
  }
}

async function getData(url) {
  requireApiUrl();
  const response = await http.get(url);
  return response.data;
}

// 이번 주 서버는 수정·삭제 API를 제공하지 않습니다.
const updateRestaurant = async () => {
  throw new Error('이번 주 서버는 맛집 수정 API를 제공하지 않습니다.');
};
const deleteRestaurant = async () => {
  throw new Error('이번 주 서버는 맛집 삭제 API를 제공하지 않습니다.');
};

export const restaurantAPI = {
  getRestaurants: () => getData('/api/restaurants'),
  getRestaurantById: (id) =>
    getData(`/api/restaurants/${encodeURIComponent(String(id))}`),
  getPopularRestaurants: () =>
    getData('/api/restaurants/popular'),
  createRestaurant: async (payload) => {
    requireApiUrl();
    const response = await http.post('/api/restaurants', payload);
    return response.data;
  },
  updateRestaurant,
  deleteRestaurant,
};

export default restaurantAPI;
