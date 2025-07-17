// // Use your deployed backend URL instead of localhost
const API_BASE = 'https://oxeir-ai-resume-builder-manas-kulkarni-1.onrender.com/api';

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();
  if (!response.ok) throw new Error(data.msg || 'API Error');
  return data;
};
