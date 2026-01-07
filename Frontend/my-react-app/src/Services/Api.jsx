import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.authorization = token;
  }
  return config;
});

// Auth APIs
export const loginUser = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

export const registerUser = async (name, email, password, monthlyBudget) => {
  const res = await api.post('/auth/register', { name, email, password, monthlyBudget });
  return res.data;
};

// User Expense APIs
export const getUserExpenses = async () => {
  const res = await api.get('/expenses/');
  return res.data;
};

export const addExpense = async (expenseData) => {
  const res = await api.post('/expenses/', expenseData);
  return res.data;
};

export const updateBudget = async (monthlyBudget) => {
  const res = await api.put('/expenses/budget', { monthlyBudget });
  return res.data;
};

// Admin APIs
export const getAllExpenses = async () => {
  const res = await api.get('/admin/expenses');
  return res.data;
};

export const exportExpenses = async () => {
  const res = await api.get('/admin/export', { responseType: 'blob' });
  return res.data;
};
