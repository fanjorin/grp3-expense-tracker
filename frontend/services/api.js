const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const transactionAPI = {
  create: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  },

  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: "DELETE",
      });
      return await response.json();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  },
};