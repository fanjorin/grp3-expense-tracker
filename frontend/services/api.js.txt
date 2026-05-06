const BASE_URL = 'http://localhost:3000/api/v1';

export const transactionAPI = {

  getAll: async () => {
    const res = await fetch(`${BASE_URL}/transactions`);
    const { data } = await res.json();
    return data;
  },

  delete: async (id) => {
    await fetch(`${BASE_URL}/transactions/${id}`, { method: 'DELETE' });
  }
};