export const environment = {
  production: false,
  BASE_URL: 'http://localhost:5000/api'
};

export const ENDPOINTS = {
  REGISTER: `${environment.BASE_URL}/register`,
  LOGIN: `${environment.BASE_URL}/login`
};
